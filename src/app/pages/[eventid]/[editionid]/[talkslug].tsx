import LinkPrefetch from "../../../components/LinkPrefetch";
import Layout from "../../../components/Layout";
import YouTube from "react-youtube";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Link,
  Divider,
  Paper
} from "@material-ui/core";
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkOutlinedIcon,
  Stars as CuratedIcon,
  ArrowUpward as VoteUp
} from "@material-ui/icons";
import { Talk, TalkGroupContents, Stack, TalkPreview } from "../../../schema";
import Database from "../../../services/Database";
import { NextPage, NextPageContext } from "next";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useContext, useState, useEffect, useLayoutEffect } from "react";
import Stacks from "../../../components/Stacks";
import { StackContext } from "../../../components/context-providers/StackContextProvider";
import TalkGroup from "../../../components/TalkGroup";
import STACKS from "../../../constants/stacks";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../stores/useStores";

declare const _carbonads: any;

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
    description: {
      maxHeight: "4.5em",
      overflow: "hidden"
    },
    descriptionExpanded: {
      whiteSpace: "pre-line"
    },
    showMoreDescription: {
      color: theme.palette.text.secondary,
      padding: 0,
      marginTop: theme.spacing(0.5)
    },
    tag: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    youtubePlayer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }
  })
);

interface Props {
  talk: Talk;
}

const TalkDetails: NextPage<Props> = observer(({ talk }) => {
  const [expandDescription, setExpandDescription] = useState();
  const { state: stateStack } = useContext(StackContext);
  const { userStore } = useStores();
  const classes = useStyles({});

  const [renderAd, setRenderAd] = useState();
  const [adScripLoaded, setAdScriptLoaded] = useState();
  useEffect(() => {
    // Render ad only after client has been hydrated
    setRenderAd(true);
  }, []);
  useLayoutEffect(() => {
    if (adScripLoaded && typeof _carbonads !== "undefined")
      _carbonads.refresh();
    else {
      const carbon_wrapper = document.querySelector(".carbon-adds-wrapper");
      if (carbon_wrapper) {
        const script = document.createElement("script");
        script.src =
          "//cdn.carbonads.com/carbon.js?serve=CK7DK5QY&placement=hero35com";
        script.async = true;
        script.id = "_carbonads_js";
        carbon_wrapper.appendChild(script);
        setAdScriptLoaded(true);
      }
    }
  }, [talk.id, renderAd]);

  const talkStacks: Stack[] = STACKS.filter(stack =>
    talk.tags.includes(stack.slug)
  );
  const talkTopics: string[] = talk.tags.filter(
    tag => !talkStacks.find(stack => stack.slug === tag)
  );

  const savedTalksGroup: TalkGroupContents = {
    title: "My saved talks",
    talks: userStore.savedTalks
  };

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
      image={`https://i.ytimg.com/vi/${talk.youtubeId ||
        talk.id}/hqdefault.jpg`}
    >
      <Breadcrumbs items={breadcrumbs} />
      <Container className={classes.containerVideo}>
        <TalkVideo
          videoid={talk.youtubeId || talk.id}
          start={talk.start}
          end={talk.end}
        />
      </Container>
      <Container className={classes.container}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" component="h1">
                      {talk.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TalkControls talk={talk} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                {renderAd && <div className={`carbon-adds-wrapper`}></div>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Event:{" "}
                  <LinkPrefetch
                    passHref
                    href={`/[eventid]/[editionid]`}
                    as={`/${talk.eventId}/${talk.editionId}`}
                  >
                    <Link>{`${talk.eventTitle} ${talk.editionTitle}`}</Link>
                  </LinkPrefetch>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Speaker{speakers.length > 1 && "s"}:{" "}
                  <TalkSpeakers speakers={speakers} />
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  Date: {shortDate(talk.date)}
                </Typography>
              </Grid>
            </Grid>
            {(talkTopics.length > 0 || talkStacks.length > 0) && (
              <Box marginTop={0.5}>
                <Typography variant="body2" color="textSecondary">
                  Talk topics: <TalkTags tags={talkTopics} />
                </Typography>
              </Box>
            )}
          </Grid>
          {talkStacks.length > 0 && (
            <Grid item xs={12}>
              <Stacks customStacks={talkStacks} showOutlines={true} />
            </Grid>
          )}
          {talk.isCurated && (
            <>
              <Grid item xs={12} md={8}>
                <Paper>
                  <Box padding={2}>
                    <Grid
                      container
                      alignItems="baseline"
                      justify="space-between"
                    >
                      <Grid item>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <Typography
                              variant="overline"
                              color="textSecondary"
                              style={{ lineHeight: 1 }}
                              component="h2"
                            >
                              Curated talk
                            </Typography>
                          </Grid>
                          <Grid item>
                            <CuratedIcon
                              color="secondary"
                              fontSize="inherit"
                              style={{ verticalAlign: "text-bottom" }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              style={{ lineHeight: 1 }}
                              variant="caption"
                              color="textSecondary"
                            >
                              Editor's note:
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="overline">
                          <LinkPrefetch
                            passHref
                            href={`/curated-conference-talks${
                              stateStack.slug ? `?stack=${stateStack.slug}` : ""
                            }`}
                            as={`/curated-conference-talks${
                              stateStack.slug ? `?stack=${stateStack.slug}` : ""
                            }`}
                          >
                            <Link color="primary">More curated talks</Link>
                          </LinkPrefetch>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body1" gutterBottom>
                      {talk.curationDescription}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </>
          )}
          {(talk.description || talk.curationDescription) && (
            <>
              <Grid item xs={12} md={8}>
                <Typography
                  variant="body1"
                  className={
                    expandDescription
                      ? classes.descriptionExpanded
                      : classes.description
                  }
                >
                  {talk.description ||
                    (!talk.isCurated && talk.curationDescription)}
                </Typography>
                {talk.description && !expandDescription && (
                  <Button
                    variant="text"
                    className={classes.showMoreDescription}
                    onClick={_ => setExpandDescription(true)}
                  >
                    Show more
                  </Button>
                )}
              </Grid>
            </>
          )}
        </Grid>
      </Container>
      <Box marginBottom={4} marginTop={4}>
        <Divider />
      </Box>
      {savedTalksGroup.talks.length > 0 && (
        <>
          <TalkGroup talkGroup={savedTalksGroup} />
          <Box marginBottom={4} marginTop={4}>
            <Divider />
          </Box>
        </>
      )}
      <Container>
        <Stacks />
      </Container>
    </Layout>
  );
});

const TalkSpeakers = ({ speakers }: { speakers: string[] }) => (
  <>
    {speakers.map((speaker, index) => (
      <LinkPrefetch
        key={index}
        passHref
        href={`/hero/[heroid]`}
        as={`/hero/${encodeURIComponent(speaker)}`}
      >
        <Link>
          {speaker}
          {index + 1 < speakers.length && ", "}
        </Link>
      </LinkPrefetch>
    ))}
  </>
);

const TalkTags = ({ tags }: { tags: string[] }) => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});
  return (
    <>
      {tags.sort().map(tag => (
        <LinkPrefetch
          key={tag}
          href={`/topic/[topicid]${
            stateStack.slug ? `?stack=${stateStack.slug}` : ""
          }`}
          as={`/topic/${tag.toLowerCase()}${
            stateStack.slug ? `?stack=${stateStack.slug}` : ""
          }`}
          passHref
        >
          <Link className={classes.tag}>#{tag}</Link>
        </LinkPrefetch>
      ))}
    </>
  );
};

type TalkVideo = {
  videoid: string;
  start?: number;
  end?: number;
};

const TalkVideo = ({ videoid, start, end }: TalkVideo) => {
  const classes = useStyles({});
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: { end, modestbranding: true, playsinline: true, rel: 0, start }
  };
  return (
    <Box
      marginBottom={2}
      style={{
        position: "relative",
        paddingBottom: "56.25%" /* maintain 16:9 aspect ratio */,
        paddingTop: 25,
        height: 0
      }}
    >
      <YouTube
        className={classes.youtubePlayer}
        videoId={videoid}
        opts={opts}
      />
    </Box>
  );
};

const TalkControls = ({ talk }: { talk: TalkPreview }) => {
  const { userStore } = useStores();

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            color="secondary"
            variant={userStore.isTalkLiked(talk.id) ? "contained" : "outlined"}
            size="large"
            startIcon={
              <>
                <VoteUp />
              </>
            }
            onClick={_ => userStore.likeTalk(talk.id)}
          >
            {userStore.isTalkLiked(talk.id) ? "Upvoted" : "Upvote"}
          </Button>
        </Grid>
        <Grid item>
          {userStore.isTalkSaved(talk.id) ? (
            <Button
              title="Remove this saved talk"
              onClick={_ => userStore.unsaveTalk(talk)}
              startIcon={<BookmarkIcon color="secondary" />}
            >
              Saved
            </Button>
          ) : (
            <Button
              title="Save this talk in your Saved Talks"
              onClick={_ => userStore.saveTalk(talk)}
              startIcon={<BookmarkOutlinedIcon color="secondary" />}
            >
              Save for later
            </Button>
          )}
        </Grid>
      </Grid>
      <Box marginTop={1}>
        <Typography variant="caption" color="textSecondary">
          Remember to upvote the talks that you like! It allows us to recommend
          better talks to you and the community.
        </Typography>
      </Box>
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
