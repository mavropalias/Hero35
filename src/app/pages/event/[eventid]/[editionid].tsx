import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import EditionTalks from "../../../components/EditionTalks";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Link,
  Chip,
  Container,
  Grid
} from "@material-ui/core";
import { OpenInNew as LinkIcon } from "@material-ui/icons";
import { Talk, EventEdition } from "../../../schema";
import Database from "../../../services/Database";
import { NextPage, NextPageContext } from "next";
import TalkList from "../../../components/TalkList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    },
    logo: {
      maxWidth: "50%"
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

interface Props {
  edition: EventEdition;
}

const EditionDetails: NextPage<Props, Props> = ({ edition }) => {
  const classes = useStyles({});
  const router = useRouter();
  const { eventid, editionid } = router.query;

  const shortDate = (date: string) => {
    const startDate = new Date(date);
    var options = {
      month: "short",
      day: "numeric"
    };

    return startDate.toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <Container className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item>
                <img
                  className={classes.logo}
                  src={`${process.env.STORAGE_PATH}${encodeURIComponent(
                    edition.logo
                  )}?alt=media`}
                  alt="Event logo"
                />
                <Typography variant="h1">
                  {edition.eventTitle} {edition.title}
                </Typography>
                <Typography variant="subtitle1">
                  {edition.state || edition.city}, {edition.country}
                </Typography>
                <Typography variant="subtitle2">
                  {shortDate(edition.startDate)}&ndash;
                  {shortDate(edition.endDate)}
                </Typography>
                <Link href={edition.website} target="_blank" variant="button">
                  Official website <LinkIcon />
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" gutterBottom>
                  {(edition.durationMinutes / 60).toFixed(0)} hours of content
                  in:
                </Typography>
                {edition.categories.map(cat => (
                  <Chip
                    color="default"
                    variant="outlined"
                    key={cat.id}
                    label={`#${cat.title}`}
                    className={classes.chip}
                  />
                ))}
              </Grid>
              <Grid item>
                <Typography variant="body1">{edition.description}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <EditionTalks edition={edition} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

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
  eventid?: string;
  editionid?: string;
}
EditionDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { eventid, editionid } = (ctx.query as unknown) as QueryProps;
  const edition = await Database.getEdition(eventid, editionid);
  return { edition };
};

export default EditionDetails;
