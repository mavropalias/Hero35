import { default as NextLink } from "next/link";
import Layout from "../../../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Link,
  Chip,
  Container,
  Avatar,
  Grid
} from "@material-ui/core";
import { Talk } from "../../../schema";
import Database from "../../../services/Database";
import { NextPage, NextPageContext } from "next";
import Breadcrumbs from "../../../components/Breadcrumbs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumb: {
      display: "none"
    },
    container: {
      marginTop: theme.spacing(2)
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    description: {
      whiteSpace: "pre-line"
    }
  })
);

interface Props {
  talk: Talk;
}

const TalkDetails: NextPage<Props> = ({ talk }) => {
  const classes = useStyles({});

  const shortDate = (date: string) => {
    const shortDate = new Date(date);
    var options = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };
    return shortDate.toLocaleDateString(undefined, options);
  };

  const breadcrumbs = [
    {
      path: talk.eventId,
      title: talk.eventTitle
    },
    {
      path: `${talk.eventId}/${talk.editionId}`,
      title: talk.editionTitle
    },
    {
      title: talk.title
    }
  ];

  return (
    <Layout
      title={`${talk.title} - ${talk.speaker}`}
      description={talk.curationDescription || talk.description}
      keywords={talk.tags.join(",")}
    >
      <Breadcrumbs items={breadcrumbs} />
      <Container className={classes.container}>
        <Box marginBottom={2}>
          <Grid container spacing={1}>
            <Grid item sm={12}>
              <Typography variant="h5" component="h1">
                {talk.title}
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle1">{talk.speaker}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  &nbsp;-&nbsp;{talk.times.totalMins} mins&nbsp;-&nbsp;
                  {shortDate(talk.date)}
                </Typography>
              </Box>
            </Grid>
            {talk.curationDescription && (
              <Grid item sm={12}>
                <Typography variant="body2" paragraph>
                  <strong>EDITOR'S CHOICE:</strong>&nbsp;
                  {talk.curationDescription}
                </Typography>
              </Grid>
            )}
            <Grid item sm={12}>
              <NextLink
                passHref
                href={`/[eventid]/[editionid]`}
                as={`/${talk.eventId}/${talk.editionId}`}
              >
                <Chip
                  avatar={
                    <Avatar
                      component="span"
                      alt={`${talk.eventTitle} ${talk.editionTitle} logo`}
                      src={`${process.env.STORAGE_PATH}${encodeURIComponent(
                        talk.logo
                      )}?alt=media`}
                    />
                  }
                  component="a"
                  label={`${talk.eventTitle} ${talk.editionTitle}`}
                  className={classes.chip}
                />
              </NextLink>
              {talk.tags.map(tag => (
                <NextLink
                  key={tag}
                  href={`/topic/[topicid]`}
                  as={`/topic/${tag.toLowerCase()}`}
                  passHref
                >
                  <Chip
                    component="a"
                    color="primary"
                    label={tag}
                    className={classes.chip}
                  />
                </NextLink>
              ))}
            </Grid>
          </Grid>
        </Box>
        <TalkVideo videoid={talk.id} />
        <Typography variant="body1" className={classes.description} paragraph>
          {talk.description}
        </Typography>
      </Container>
    </Layout>
  );
};

const TalkVideo = ({ videoid }: { videoid: string }) => (
  <Box
    marginBottom={2}
    style={{
      position: "relative",
      paddingBottom: "56.25%" /* maintain 16:9 aspect ratio */,
      paddingTop: 25,
      height: 0
    }}
  >
    <iframe
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
      src={`https://www.youtube-nocookie.com/embed/${videoid}`}
      frameBorder="0"
    />
  </Box>
);

interface QueryProps {
  eventid: string;
  editionid: string;
  talkslug: string;
}
TalkDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { eventid, editionid, talkslug } = (ctx.query as unknown) as QueryProps;
  const talk = await Database.getTalk(eventid, editionid, talkslug);
  return { talk };
};

export default TalkDetails;
