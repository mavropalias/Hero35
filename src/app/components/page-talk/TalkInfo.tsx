import LinkPrefetch from "../LinkPrefetch";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  Link
} from "@material-ui/core";
import { Talk } from "../../schema";
import { useState } from "react";
import STACKS from "../../constants/stacks";
import TalkControls from "../TalkControls";

declare const _carbonads: any;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      maxWidth: theme.breakpoints.values.sm,
      maxHeight: "4.5em",
      overflow: "hidden"
    },
    descriptionExpanded: {
      maxWidth: theme.breakpoints.values.sm,
      whiteSpace: "pre-line"
    },
    info: {
      display: "block",
      margin: theme.spacing(0, 2),
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 3)
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 4)
      }
    },
    infoLink: {
      color: theme.palette.text.secondary,
      textDecoration: "underline"
    },
    showMoreDescription: {
      color: theme.palette.text.secondary,
      padding: 0,
      marginTop: theme.spacing(0.5)
    },
    tag: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1)
    }
  })
);

const TalkInfo = ({
  talk,
  showHeader
}: {
  talk: Talk;
  showHeader: boolean;
}) => {
  const classes = useStyles({});
  const [expandDescription, setExpandDescription] = useState();

  // Carbon ads - DISABLED
  // ---------------------------------------------------------------------------
  // const [renderAd, setRenderAd] = useState();
  // const [adScripLoaded, setAdScriptLoaded] = useState();
  // useEffect(() => {
  //   // Render ad only after client has been hydrated
  //   setRenderAd(true);
  // }, []);
  // useEffect(() => {
  //   if (adScripLoaded && typeof _carbonads !== "undefined")
  //     // If Carbon has been loaded, then just refresh
  //     _carbonads.refresh();
  //   else {
  //     // Load Carbon
  //     const carbon_wrapper = document.querySelector(".carbon-adds-wrapper");
  //     if (carbon_wrapper) {
  //       const script = document.createElement("script");
  //       script.src =
  //         "//cdn.carbonads.com/carbon.js?serve=CK7DK5QY&placement=hero35com";
  //       script.async = true;
  //       script.id = "_carbonads_js";
  //       carbon_wrapper.appendChild(script);
  //       setAdScriptLoaded(true);
  //     }
  //   }
  // }, [talk.id, renderAd]);

  const speakers = talk.speaker
    .split(/ *(,| and | & ) */g)
    .filter(speaker => ![",", " and ", " & "].includes(speaker));

  const talkPrimaryTopics: string[] = STACKS.filter(stack =>
    talk.tags.includes(stack.slug)
  ).map(stack => stack.slug);

  const talkSecondaryTopics: string[] = talk.tags.filter(
    tag => !talkPrimaryTopics.includes(tag)
  );

  return (
    <section className={classes.info}>
      {showHeader && (
        <header>
          <Typography variant="h4" component="h1">
            {talk.title}
          </Typography>
          <Box marginTop={2} marginBottom={2}>
            <TalkControls talk={talk} size="large" />
          </Box>
        </header>
      )}
      {/* {renderAd && <div className={`carbon-adds-wrapper`}></div>} */}
      <Typography variant="h5" component="p" color="textSecondary" paragraph>
        <TalkSpeakers speakers={speakers} /> at{" "}
        <LinkPrefetch
          passHref
          href={`/[eventid]/[editionid]`}
          as={`/${talk.eventId}/${talk.editionId}`}
        >
          <Link
            className={classes.infoLink}
          >{`${talk.eventTitle} ${talk.editionTitle}`}</Link>
        </LinkPrefetch>
      </Typography>
      {(talk.description || talk.curationDescription) && (
        <>
          <Typography
            variant="body1"
            color="textSecondary"
            className={
              expandDescription
                ? classes.descriptionExpanded
                : classes.description
            }
          >
            {talk.description || (!talk.isCurated && talk.curationDescription)}
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
        </>
      )}
      <Box marginTop={2}>
        <TalkTags tags={talkPrimaryTopics} size="large" />
        <TalkTags tags={talkSecondaryTopics} size="small" />
      </Box>
    </section>
  );
};

const TalkSpeakers = ({ speakers }: { speakers: string[] }) => {
  const classes = useStyles({});
  return (
    <>
      {speakers.map((speaker, index) => (
        <LinkPrefetch
          key={index}
          passHref
          href={`/hero/[heroid]`}
          as={`/hero/${encodeURIComponent(speaker)}`}
        >
          <Link className={classes.infoLink}>
            {speaker}
            {index + 1 < speakers.length && ", "}
          </Link>
        </LinkPrefetch>
      ))}
    </>
  );
};

const TalkTags = ({
  tags,
  size = "small"
}: {
  tags: string[];
  size?: "small" | "large";
}) => {
  const classes = useStyles({});
  return (
    <Box>
      {tags.sort().map(tag => (
        <LinkPrefetch
          key={tag}
          href={`/topic/[topicid]`}
          as={`/topic/${tag.toLowerCase()}`}
          passHref
        >
          <Link
            variant={size === "large" ? "h5" : "caption"}
            className={classes.tag}
          >
            #{tag}
          </Link>
        </LinkPrefetch>
      ))}
    </Box>
  );
};

export default TalkInfo;
