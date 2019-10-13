import { default as NextLink } from "next/link";
import Layout from "../../components/Layout";
import EditionTalks from "../../components/EditionTalks";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Link,
  Chip,
  Container,
  Grid,
  Button,
  Box
} from "@material-ui/core";
import {
  OpenInNew as LinkIcon,
  Payment as TicketIcon
} from "@material-ui/icons";
import { EventEdition } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    },
    logo: {
      maxWidth: "50%",
      height: theme.typography.fontSize * 4
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      "&:first-child": {
        marginLeft: theme.spacing(1)
      }
    },
    chipCategory: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
      marginTop: theme.spacing(0.5)
    },
    description: {
      whiteSpace: "pre-line"
    },
    externalLinkIcon: {
      fontSize: theme.typography.fontSize
    },
    icon: {
      marginLeft: theme.spacing(1)
    }
  })
);

interface Props {
  edition: EventEdition;
}

const EditionDetails: NextPage<Props> = ({ edition }) => {
  const classes = useStyles({});

  const showTickets = (): boolean => {
    if (edition.status !== "published-notalks") return false;
    const currentDate = new Date();
    const editionDate = new Date(edition.startDate);
    if (editionDate.getTime() > currentDate.getTime()) return true;
    else return false;
  };

  const shortDate = (date: string) => {
    const startDate = new Date(date);
    var options = {
      month: "short",
      day: "numeric"
    };
    return startDate.toLocaleDateString(undefined, options);
  };

  const breadcrumbs = [
    {
      path: edition.eventId,
      title: edition.eventTitle
    },
    {
      title: edition.title
    }
  ];

  return (
    <Layout
      title={`${edition.eventTitle} ${edition.title}`}
      description={edition.description}
      keywords={`${edition.topTags &&
        edition.topTags.join(
          ","
        )},react event,react conference,developer conference`}
    >
      <Breadcrumbs items={breadcrumbs} />
      <Container className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <img
                  className={classes.logo}
                  src={`${process.env.STORAGE_PATH}${encodeURIComponent(
                    edition.logo
                  )}?alt=media`}
                  alt="Event logo"
                />
                <Typography variant="h1" component="h1" paragraph>
                  {edition.eventTitle} {edition.title}
                </Typography>
                <NextLink href="/[eventid]" as={`/${edition.eventId}`} passHref>
                  <Button color="secondary" variant="outlined">
                    View all {edition.eventTitle} events
                  </Button>
                </NextLink>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  marginTop={1}
                  flexWrap="wrap"
                >
                  {edition.durationMinutes > 0 && (
                    <Typography variant="body1">
                      {(edition.durationMinutes / 60).toFixed(0)} hours of
                      content in&nbsp;
                    </Typography>
                  )}
                  {edition.categories
                    .map(cat => <span>{cat.title}</span>)
                    .reduce((previous, current) => (
                      <>
                        {previous}, {current}
                      </>
                    ))}
                  {edition.tags && (
                    <>
                      <span>&nbsp;&nbsp;</span>
                      {edition.tags.map(
                        (tag, index) =>
                          tag.count > 1 && (
                            <NextLink
                              key={index}
                              passHref
                              href={`/topic/[topicid]`}
                              as={`/topic/${tag.label.toLowerCase()}`}
                            >
                              <Chip
                                component="a"
                                color="primary"
                                variant="outlined"
                                size="small"
                                key={index}
                                label={tag.label}
                                className={classes.chip}
                              />
                            </NextLink>
                          )
                      )}
                    </>
                  )}{" "}
                  and more.
                </Box>
              </Grid>
              {showTickets() && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    href={edition.ticketsUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    Buy tickets
                    <TicketIcon className={classes.icon} />
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="h5" component="h2">
                  Event info
                </Typography>
                <Typography variant="overline">
                  {shortDate(edition.startDate)}&ndash;
                  {shortDate(edition.endDate)} | {edition.state || edition.city}
                  , {edition.country}
                </Typography>
                <Typography variant="body1" className={classes.description}>
                  {edition.description}
                </Typography>
                <p>
                  <Link
                    href={edition.website}
                    color="textSecondary"
                    target="_blank"
                    variant="body2"
                  >
                    Official website{" "}
                    <LinkIcon className={classes.externalLinkIcon} />
                  </Link>
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {edition.talks && edition.talks.length > 0 ? (
              <EditionTalks edition={edition} />
            ) : (
              <Typography variant="caption" color="textSecondary">
                No talks have been added to this event, yet.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

// TODO implement this
const EditionHighlights = ({ edition }: { edition: EventEdition }) => {
  const iframe = `<iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube-nocookie.com/embed/7S_7fKLgjXU?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1"
                    frameborder="0"
                    allow="autoplay;encrypted-media"
                  />`;

  return <div dangerouslySetInnerHTML={{ __html: iframe }} />;
};

interface QueryProps {
  eventid: string;
  editionid: string;
}
EditionDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { eventid, editionid } = (ctx.query as unknown) as QueryProps;
  const edition = await Database.getEdition(eventid, editionid);
  return { edition };
};

export default EditionDetails;
