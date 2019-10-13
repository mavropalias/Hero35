import { default as NextLink } from "next/link";
import Layout from "../../../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Chip,
  Container,
  Avatar,
  Grid,
  Paper,
  Button,
  IconButton,
  Link
} from "@material-ui/core";
import {
  Bookmark as BookmarkIcon,
  Face as SpeakerIcon,
  Stars as CuratedIcon,
  ThumbUp as VoteUp,
  ThumbDown as VoteDown
} from "@material-ui/icons";
import { Talk } from "../../../schema";
import Database from "../../../services/Database";
import { NextPage, NextPageContext } from "next";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { UserContext } from "../../../components/UserContextProvider";
import { useContext } from "react";

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
    curated: {
      color: theme.palette.secondary.main
    },
    description: {
      whiteSpace: "pre-line"
    },
    voteButton: {
      fontSize: theme.typography.fontSize * 2
    }
  })
);

interface Props {
  talk: Talk;
}

const TalkDetails: NextPage<Props> = ({ talk }) => {
  const classes = useStyles({});

  const speakers = talk.speaker
    .split(/ *(,|and|&) */g)
    .filter(speaker => ![",", "and", "&"].includes(speaker));

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
      title={`${talk.title} - ${talk.speaker} - ${talk.eventTitle} ${talk.editionTitle}`}
      description={talk.curationDescription || talk.description}
      keywords={talk.tags.join(",")}
    >
      <Breadcrumbs items={breadcrumbs} />
      <Container className={classes.container}>
        <TalkVideo videoid={talk.id} />
        <Grid container spacing={1} direction="column">
          <Grid item sm={12} md={8}>
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
                size="small"
                color="primary"
                label={`${talk.eventTitle} ${talk.editionTitle}`}
                className={classes.chip}
              />
            </NextLink>
            <TalkSpeakers speakers={speakers} />
            <Typography variant="h4" component="h1">
              {talk.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {talk.times.totalMins} mins&nbsp;-&nbsp;
              {shortDate(talk.date)}
            </Typography>
          </Grid>
          <Grid item sm={12} md={8}>
            <TalkTags tags={talk.tags} />
            <TalkControls />
          </Grid>
          {talk.curationDescription && (
            <Grid item sm={12} md={8}>
              <Paper>
                <Box
                  paddingTop={1}
                  paddingLeft={2}
                  paddingRight={2}
                  paddingBottom={2}
                >
                  <Grid
                    container
                    className={classes.curated}
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid item>
                      <CuratedIcon />
                    </Grid>
                    <Grid item>
                      <Typography variant="overline">
                        Editor's choice
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1">
                    {talk.curationDescription}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )}
          <Grid item sm={12} md={8}>
            <Typography
              variant="body1"
              className={classes.description}
              paragraph
            >
              {talk.description}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

const TalkSpeakers = ({ speakers }: { speakers: string[] }) => {
  const classes = useStyles({});
  return (
    <>
      {speakers.map((speaker, index) => (
        <NextLink
          key={index}
          passHref
          href={`/hero/[heroid]`}
          as={`/hero/${encodeURI(speaker)}`}
        >
          <Chip
            component="a"
            color="primary"
            size="small"
            title={`${speaker} conference talks`}
            icon={<SpeakerIcon />}
            label={speaker}
            className={classes.chip}
          />
        </NextLink>
      ))}
    </>
  );
};

const TalkTags = ({ tags }: { tags: string[] }) => {
  const classes = useStyles({});
  return (
    <>
      {tags.map(tag => (
        <NextLink
          key={tag}
          href={`/topic/[topicid]`}
          as={`/topic/${tag.toLowerCase()}`}
          passHref
        >
          <Chip
            component="a"
            color="primary"
            variant="outlined"
            size="small"
            label={tag}
            className={classes.chip}
          />
        </NextLink>
      ))}
    </>
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
      allowFullScreen={true}
    />
  </Box>
);

const TalkControls = () => {
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles({});
  return (
    <>
      <Grid container alignItems="center">
        <Grid item>
          <Box marginRight={3}>
            <IconButton title="Like" color="primary" disabled={!state.signedIn}>
              <VoteUp className={classes.voteButton} />
            </IconButton>
            <IconButton
              title="Disike"
              color="primary"
              disabled={!state.signedIn}
            >
              <VoteDown className={classes.voteButton} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item>
          <Box marginRight={2}>
            <Button
              color="secondary"
              disabled={!state.signedIn}
              title="Save this talk in your Saved Videos"
              startIcon={<BookmarkIcon />}
            >
              Save
            </Button>
          </Box>
        </Grid>
        <Grid item>
          {!state.signedIn ? (
            <Typography variant="overline">
              <NextLink href={`/account`} as={`/account`} passHref>
                <Link>Sign in</Link>
              </NextLink>
            </Typography>
          ) : (
            <Typography variant="overline" color="textSecondary">
              Vote/save coming soon
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

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
