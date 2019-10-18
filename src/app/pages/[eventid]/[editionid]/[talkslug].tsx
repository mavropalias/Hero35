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
import Stacks from "../../../components/Stacks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadcrumb: {
      display: "none"
    },
    container: {
      marginTop: theme.spacing(2)
    },
    containerVideo: {
      padding: 0
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
    eventTitle: {
      lineHeight: 1.2
    },
    tag: {
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

  const speakers = talk.speaker
    .split(/ *(,| and | & ) */g)
    .filter(speaker => ![",", " and ", " & "].includes(speaker));

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
      <Container className={classes.containerVideo}>
        <TalkVideo videoid={talk.id} />
      </Container>
      <Container className={classes.container}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} md={8}>
            <Typography variant="body1" color="textSecondary" component="div">
              <TalkTags tags={talk.tags} />
            </Typography>
            <Typography variant="h5" component="h1">
              {talk.title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" paragraph>
              Speaker{speakers.length > 1 && "s"}:{" "}
              <TalkSpeakers speakers={speakers} />
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  component="span"
                  alt={`${talk.eventTitle} ${talk.editionTitle} logo`}
                  src={`${process.env.STORAGE_PATH}${encodeURIComponent(
                    talk.logo
                  )}?alt=media`}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" className={classes.eventTitle}>
                  Event:&nbsp;
                  <NextLink
                    passHref
                    href={`/[eventid]/[editionid]`}
                    as={`/${talk.eventId}/${talk.editionId}`}
                  >
                    <Link>{`${talk.eventTitle} ${talk.editionTitle}`}</Link>
                  </NextLink>{" "}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {shortDate(talk.date)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <TalkControls />
          </Grid>
          {talk.curationDescription && (
            <Grid item xs={12} md={8}>
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
          <Grid item xs={12} md={8}>
            <Typography variant="body1" className={classes.description}>
              {talk.description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <hr />
            <Typography variant="h6" paragraph>
              Explore more stacks:
            </Typography>
            <Stacks />
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
          <Link>
            {speaker}
            {index + 1 < speakers.length && ", "}
          </Link>
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
          <Link className={classes.tag}>#{tag}</Link>
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
              <VoteUp />
            </IconButton>
            <IconButton
              title="Disike"
              color="primary"
              disabled={!state.signedIn}
            >
              <VoteDown />
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
