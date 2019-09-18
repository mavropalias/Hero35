import { default as NextLink } from "next/link";
import Layout from "../../../../components/Layout";
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
import { Talk } from "../../../../schema";
import Database from "../../../../services/Database";
import { NextPage, NextPageContext } from "next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
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

  return (
    <Layout>
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
            <Grid item sm={12}>
              <NextLink
                passHref
                href={`/event/[eventid]/[editionid]`}
                as={`/event/${talk.eventId}/${talk.editionId}`}
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
                <Chip
                  color="default"
                  variant="outlined"
                  key={tag}
                  label={`#${tag}`}
                  className={classes.chip}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
        <TalkVideo videoid={talk.id} />
        <Typography variant="body1" paragraph>
          {talk.description}
        </Typography>
      </Container>
    </Layout>
  );
};

const TalkVideo = ({ videoid }: { videoid: string }) => {
  const iframe = `<iframe
                    width="100%"
                    height="600"
                    src="https://www.youtube-nocookie.com/embed/${videoid}"
                    frameborder="0"
                    allow="encrypted-media"
                  />`;

  return <Box marginBottom={2} dangerouslySetInnerHTML={{ __html: iframe }} />;
};

interface QueryProps {
  eventid: string;
  editionid: string;
  talkid: string;
}
TalkDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { eventid, editionid, talkid } = (ctx.query as unknown) as QueryProps;
  const talk = await Database.getTalk(eventid, editionid, talkid);
  return { talk };
};

export default TalkDetails;
