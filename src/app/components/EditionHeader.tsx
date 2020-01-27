import YouTube from "react-youtube";
import { EventEdition } from "../schema";
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
  Box,
  Link,
  Divider,
  Chip
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  OpenInNew as LinkIcon,
  LocalPlay as DistinctiveIcon,
  Payment as TicketIcon
} from "@material-ui/icons";
import CATEGORIES from "../constants/categories";
import { useContext, useState } from "react";
import { StackContext } from "./context-providers/StackContextProvider";
import LinkPrefetch from "./LinkPrefetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      "&:first-child": {
        marginLeft: theme.spacing(1)
      }
    },
    description: {
      whiteSpace: "pre-line"
    },
    distinctiveContainer: {
      zIndex: 2,
      position: "absolute",
      top: theme.spacing(2),
      color: theme.palette.secondary.main,
      width: "100%"
    },
    externalLinkIcon: {
      fontSize: theme.typography.fontSize
    },
    highlightsContainer: {
      position: "relative",
      paddingBottom: "56.25%" /* maintain 16:9 aspect ratio */,
      paddingTop: 25,
      height: 0,
      pointerEvents: "none"
    },
    logo: {
      maxWidth: "50%",
      height: theme.spacing(16)
    },
    logoContainer: {
      position: "absolute",
      zIndex: 2,
      bottom: theme.spacing(-2),
      width: "100%",
      textAlign: "center"
    },
    shadow: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `linear-gradient(0deg, ${fade(
        theme.palette.background.default,
        1
      )} 14%, ${fade(theme.palette.background.default, 0)} 30%, ${fade(
        theme.palette.background.default,
        0
      )} 70%, ${fade(theme.palette.background.default, 1)} 81%)`,
      zIndex: 1
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

const EditionHeader = ({ edition }: { edition: EventEdition }) => {
  const classes = useStyles({});
  const showTickets = (): boolean => {
    if (!edition.ticketsUrl) return false;
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
  return (
    <header>
      <EditionHighlights edition={edition} />
      <Box marginTop={2} textAlign="center">
        <Typography variant="h2" component="h1" gutterBottom>
          {edition.eventTitle} {edition.title}
        </Typography>
        <Typography variant="subtitle1">
          {shortDate(edition.startDate)}&nbsp;&ndash;&nbsp;
          {shortDate(edition.endDate)} | {edition.state || edition.city},{" "}
          {edition.country}
        </Typography>
        <LinkPrefetch href="/[eventid]" as={`/${edition.eventId}`} passHref>
          <Link color="primary">View all {edition.eventTitle} events</Link>
        </LinkPrefetch>
        {showTickets() && (
          <Box m={4}>
            <Button
              variant="contained"
              color="secondary"
              href={`${edition.ticketsUrl}${
                edition.ticketsUrl.includes("?") ? "&ref=hero35" : "?ref=hero35"
              }`}
              target="_blank"
              rel="noopener"
              startIcon={<TicketIcon />}
            >
              Buy tickets
            </Button>
          </Box>
        )}
      </Box>
      <Box m={4}>
        <Divider variant="middle" />
      </Box>
      <EditionContentDetails edition={edition} />
      <Box m={4}>
        <Divider variant="middle" />
      </Box>
      <Typography variant="body1" className={classes.description}>
        {edition.description}
      </Typography>
      <p>
        <Link
          href={`${edition.website}?ref=hero35`}
          color="textSecondary"
          target="_blank"
          variant="body2"
        >
          Official website <LinkIcon className={classes.externalLinkIcon} />
        </Link>
      </p>
    </header>
  );
};

const EditionDistinctive = () => {
  const classes = useStyles({});
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={classes.distinctiveContainer}
    >
      <DistinctiveIcon />
      &nbsp;
      <Typography
        variant="subtitle1"
        title="This event has superior content and excellent audio / video quality. The Editor's Choice talks are only the beginning. We're confident that you'll enjoy most of the content."
      >
        Distinctive event
      </Typography>
    </Box>
  );
};

const EditionHighlights = ({ edition }: { edition: EventEdition }) => {
  const classes = useStyles({});
  const [error, setError] = useState(false);
  const highlightVideos = () => {
    // Find highlight videos (type '9'), starting with the shortest one
    // We need at least two items in the return array, so that YouTube can loop
    // through them.
    if (!edition.talks) return [];
    let highlightVideos = edition.talks
      .filter(talk => talk.type === "9")
      .sort((a, b) => (a.times.totalMins > b.times.totalMins ? 1 : -1))
      .map(talk => talk.youtubeId);
    if (highlightVideos.length === 0) {
      highlightVideos = [
        edition.talks[0].youtubeId,
        edition.talks[1].youtubeId
      ];
    } else if (highlightVideos.length === 1) {
      highlightVideos.push(highlightVideos[0]);
    }
    return highlightVideos;
  };
  const youtubeOptions = {
    height: "100%",
    width: "100%",
    playerVars: {
      modestbranding: true,
      playsinline: true,
      rel: 0,
      autoplay: 1,
      mute: 1,
      loop: 1,
      controls: 0,
      disablekb: 1,
      playlist: highlightVideos()
        .slice(1)
        .join(",")
    }
  };
  const onYoutubeError = event => {
    setError(true);
  };
  return (
    <section className={classes.highlightsContainer}>
      <div className={classes.shadow}></div>
      {edition.isDistinctive && <EditionDistinctive />}
      {edition.talks && !error && (
        <YouTube
          className={classes.youtubePlayer}
          videoId={highlightVideos()[0]}
          opts={youtubeOptions}
          onError={onYoutubeError}
        />
      )}
      <div className={classes.logoContainer}>
        <img
          className={classes.logo}
          src={`${process.env.STORAGE_PATH}${encodeURIComponent(
            edition.logo
          )}?alt=media`}
          alt="Event logo"
        />
      </div>
    </section>
  );
};

const EditionContentDetails = ({ edition }: { edition: EventEdition }) => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});

  return (
    <Typography variant="body1" align="center">
      {edition.durationMinutes > 0 ? (
        <>
          {edition.eventTitle} {edition.title} has{" "}
          {(edition.durationMinutes / 60).toFixed(0)} hours of content in&nbsp;
        </>
      ) : (
        <>Event category:&nbsp;&nbsp;</>
      )}
      {edition.categories
        .map(cat => (
          <span key={cat}>
            {CATEGORIES.find(category => cat === category.id) &&
              CATEGORIES.find(category => cat === category.id).title}
          </span>
        ))
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
                <LinkPrefetch
                  key={index}
                  passHref
                  href={`/topic/[topicid]${
                    stateStack.slug ? `?stack=${stateStack.slug}` : ""
                  }`}
                  as={`/topic/${tag.label.toLowerCase()}${
                    stateStack.slug ? `?stack=${stateStack.slug}` : ""
                  }`}
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
                </LinkPrefetch>
              )
          )}
        </>
      )}{" "}
      {edition.durationMinutes > 0 && <>and more.</>}
    </Typography>
  );
};

export default EditionHeader;
