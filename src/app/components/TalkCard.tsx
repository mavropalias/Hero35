import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Box,
  Paper,
  IconButton,
  Link,
  Badge
} from "@material-ui/core";
import {
  ArrowUpward as UpvoteIcon,
  Bookmark as UnsaveIcon,
  BookmarkBorder as SaveIcon
} from "@material-ui/icons";
import Database from "../services/Database";
import { default as NextLink } from "next/link";
import { NextPage } from "next";
import { Talk } from "../schema";
import { useContext, useState } from "react";
import { UserContext } from "./context-providers/UserContextProvider";
import DistinctiveTooltip from "./DistinctiveTooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    badge: { width: "100%" },
    card: {
      flex: 1,
      backgroundColor: "transparent"
    },
    content: {
      padding: theme.spacing(2, 0.5, 2, 2)
    },
    curated: {
      position: "absolute",
      top: theme.spacing(2),
      left: theme.spacing(2),
      background: `linear-gradient(35deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 100%)`,
      color: theme.palette.background.default
    },
    fill: {
      flex: 1,
      overflow: "hidden"
    },
    link: {
      textDecoration: "none",
      color: "inherit"
    },
    media: {
      paddingBottom: "56.25%" /* maintain 16:9 aspect ratio */,
      height: 0,
      position: "relative"
    },
    time: {
      position: "absolute",
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(0, 0.5)
    }
  })
);

interface Props {
  talk: Talk;
  showCuration?: boolean;
}

const TalkCard: NextPage<Props> = ({ talk, showCuration }) => {
  const [optimisticTalkState, setOptimisticTalkState] = useState<
    "saved" | "unsaved" | "liked" | "disliked" | ""
  >("");
  const { state: stateUser, dispatch } = useContext(UserContext);
  const classes = useStyles({});

  const talkTime = (talk: Talk) => {
    let h = null;
    let m = 0;
    let s = 0;
    if (talk.start) {
      h = Math.round((talk.end - talk.start) / 60 / 60);
      m = Math.round((talk.end - talk.start) / 60);
      s = (talk.end - talk.start) % 60;
    } else {
      h = talk.times.h;
      m = talk.times.m;
      s = talk.times.s;
    }
    return `${h ? `${h}:` : ""} ${m}${m < 10 ? "0" : ""}:${s}${
      s < 10 ? "0" : ""
    }`;
  };

  const saveTalk = async () => {
    try {
      setOptimisticTalkState("saved");
      const updatedUser = await Database.saveTalkInUserProfile(talk.id);
      dispatch({
        type: "HYDRATE_FROM_DB",
        payload: { ...updatedUser }
      });
    } catch (error) {
    } finally {
      setOptimisticTalkState("");
    }
  };

  const unsaveTalk = async () => {
    try {
      setOptimisticTalkState("unsaved");
      const updatedUser = await Database.unsaveTalkInUserProfile(talk.id);
      dispatch({
        type: "HYDRATE_FROM_DB",
        payload: { ...updatedUser }
      });
    } catch (error) {
    } finally {
      setOptimisticTalkState("");
    }
  };

  const isTalkSaved = (): boolean =>
    (stateUser.savedTalks.filter(savedTalk => savedTalk.id === talk.id).length >
      0 ||
      optimisticTalkState === "saved") &&
    optimisticTalkState !== "unsaved";

  const TalkCardMedia = () => (
    <NextLink
      href={`/[eventid]/[editionid]/[talkslug]`}
      as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
    >
      <a className={classes.link}>
        <DistinctiveTooltip
          title="Editor's choice"
          disableFocusListener={!talk.isCurated}
          disableHoverListener={!talk.isCurated}
          disableTouchListener={!talk.isCurated}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://i.ytimg.com/vi/${talk.youtubeId ||
                talk.id}/sddefault.jpg`}
            >
              <Typography variant="caption" className={classes.time}>
                {talkTime(talk)}
              </Typography>
            </CardMedia>
          </CardActionArea>
        </DistinctiveTooltip>
      </a>
    </NextLink>
  );

  const TalkCardContent = () => (
    <CardContent className={classes.content}>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Box display="flex" flexDirection="column" alignItems="center">
            <UpvoteIcon />
            <Typography variant="caption">{talk.likes}</Typography>
          </Box>
        </Grid>
        <Grid item className={classes.fill}>
          <Typography variant="subtitle2">{talk.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {talk.eventTitle} {talk.editionTitle}
          </Typography>
          {talk.tags && <TalkCardTags tags={talk.tags} />}
        </Grid>
        <Grid item>
          <Typography>
            {isTalkSaved() ? (
              <IconButton
                onClick={_ => unsaveTalk()}
                title="Talk is saved for later. Click to unsave."
              >
                <UnsaveIcon color="secondary" />
              </IconButton>
            ) : (
              <IconButton
                onClick={_ => saveTalk()}
                title="Save for later"
                color="secondary"
              >
                <SaveIcon />
              </IconButton>
            )}
          </Typography>
        </Grid>
      </Grid>
      {showCuration && talk.isCurated && (
        <>
          <Typography variant="body2">{talk.curationDescription}</Typography>
        </>
      )}
    </CardContent>
  );

  return (
    <Badge
      className={classes.badge}
      color="secondary"
      variant="dot"
      invisible={!talk.isCurated}
    >
      <Card className={classes.card} elevation={0}>
        <TalkCardMedia />
        <TalkCardContent />
      </Card>
    </Badge>
  );
};

const TalkCardTags = ({ tags }: { tags: string[] }) => (
  <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
    <Typography variant="body2" noWrap color="textSecondary">
      {tags.map(tag => (
        <NextLink
          href={`/topic/[topicid]`}
          as={`/topic/${tag}`}
          key={tag}
          passHref
        >
          <Link>#{tag} </Link>
        </NextLink>
      ))}
    </Typography>
  </div>
);

export default TalkCard;
