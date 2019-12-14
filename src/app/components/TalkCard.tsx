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
  Link,
  Badge,
  Button,
  CardHeader,
  CardActions,
  Paper
} from "@material-ui/core";
import {
  ArrowUpward as UpvoteIcon,
  Bookmark as UnsaveIcon,
  BookmarkBorder as SaveIcon,
  Stars as CuratedIcon
} from "@material-ui/icons";
import Database from "../services/Database";
import { NextPage } from "next";
import { TalkPreview, TalkBasic, Talk } from "../schema";
import { useContext, useState } from "react";
import { UserContext } from "./context-providers/UserContextProvider";
import DistinctiveTooltip from "./DistinctiveTooltip";
import LinkPrefetch from "./LinkPrefetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actions: {
      padding: theme.spacing(1, 0, 0, 0)
    },
    badge: {
      width: "100%",
      height: "100%"
    },
    card: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent"
    },
    content: {
      padding: theme.spacing(0)
    },
    curated: {
      position: "absolute",
      top: theme.spacing(2),
      left: theme.spacing(2),
      background: `linear-gradient(35deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 100%)`,
      color: theme.palette.background.default
    },
    disabledButton: { pointerEvents: "none" },
    header: {
      padding: theme.spacing(1, 0, 0, 0)
    },
    headerTitle: {
      maxHeight: "2.66em",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    link: {
      textDecoration: "none",
      color: "inherit"
    },
    media: {
      paddingBottom: "56.25%" /* 16:9 aspect ratio */,
      height: 0,
      overflow: "hidden",
      position: "relative",
      "& .description": {
        opacity: 0,
        transition: theme.transitions.create("opacity")
      },
      "&:hover": {
        "& .description": {
          opacity: 1
        }
      }
    },
    tag: { marginRight: theme.spacing(1) },
    time: {
      position: "absolute",
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(0, 0.5)
    },
    tooltip: {
      transform: "translate(8px, 25px) !important"
    }
  })
);

interface Props {
  talk: TalkPreview | TalkBasic;
  showCuration?: boolean;
  showTopics?: boolean;
  showVotes?: boolean;
  showSaveButton?: boolean;
}

const TalkCard: NextPage<Props> = ({
  talk,
  showCuration,
  showTopics = true,
  showVotes = true,
  showSaveButton = true
}) => {
  const [optimisticTalkState, setOptimisticTalkState] = useState<
    "saved" | "unsaved" | "liked" | ""
  >("");
  const { state: stateUser, dispatch } = useContext(UserContext);
  const classes = useStyles({});

  const isTalkPreview = (
    talk: TalkPreview | TalkBasic
  ): talk is TalkPreview => {
    return (talk as TalkPreview).likes !== undefined;
  };

  const talkTime = (talk: TalkPreview) => {
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
    return `${h ? `${h}:` : ""} ${m < 10 ? "0" : ""}${m}:${
      s < 10 ? "0" : ""
    }${s}`;
  };

  const likeTalk = async () => {
    try {
      setOptimisticTalkState("liked");
      const updatedUser = await Database.likeTalk(talk.id);
      dispatch({
        type: "HYDRATE_FROM_DB",
        payload: { ...updatedUser }
      });
    } catch (error) {
    } finally {
      setOptimisticTalkState("");
    }
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

  const isTalkLiked = (talkId: string): boolean =>
    stateUser.likedTalks.includes(talkId) || optimisticTalkState === "liked";

  const isTalkSaved = (): boolean =>
    (stateUser.savedTalks.filter(savedTalk => savedTalk.id === talk.id).length >
      0 ||
      optimisticTalkState === "saved") &&
    optimisticTalkState !== "unsaved";

  const TalkCardHeader = () => (
    <CardHeader
      title={
        showVotes || !showSaveButton ? (
          talk.title
        ) : (
          <Box display="flex" alignItems="flex-start">
            <Box flex="1" marginRight={2}>
              {talk.title}
            </Box>
            <SaveButton showLabel={false} />
          </Box>
        )
      }
      subheader={showTopics && <TalkCardTags tags={talk.tags} />}
      className={classes.header}
      classes={{ title: classes.headerTitle }}
    />
  );

  const TalkCardMedia = () => (
    <LinkPrefetch
      href={`/[eventid]/[editionid]/[talkslug]`}
      as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
    >
      <a className={classes.link}>
        <DistinctiveTooltip
          title="Curated talk"
          placement="top-end"
          classes={{
            tooltip: classes.tooltip
          }}
          disableFocusListener={!talk.isCurated}
          disableHoverListener={!talk.isCurated}
          disableTouchListener={!talk.isCurated}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://i.ytimg.com/vi/${talk.youtubeId ||
                talk.id}/hq${talk.coverImage || "default"}.jpg`}
            >
              {isTalkPreview(talk) && (
                <Typography variant="caption" className={classes.time}>
                  {talkTime(talk)}
                </Typography>
              )}
              {talk.curationDescription && <TalkInfo talk={talk} />}
            </CardMedia>
          </CardActionArea>
        </DistinctiveTooltip>
      </a>
    </LinkPrefetch>
  );

  const TalkInfo = ({ talk }: { talk: TalkBasic | TalkPreview }) => (
    <Box padding={0.5} className="description">
      <Paper elevation={0}>
        <Box padding={1}>
          <Typography variant="caption">{talk.curationDescription}</Typography>
        </Box>
      </Paper>
    </Box>
  );

  const TalkCardContent = () => (
    <>
      {talk.isCurated && (
        <CardContent className={classes.content}>
          <Box marginTop={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              title="Editor's choice"
            >
              <CuratedIcon fontSize="inherit" color="action" />
              &nbsp;
              {talk.curationDescription}
            </Typography>
          </Box>
        </CardContent>
      )}
    </>
  );

  const TalkCardActions = () => (
    <>
      {isTalkPreview(talk) && (
        <CardActions className={classes.actions}>
          <Button
            title={isTalkLiked(talk.id) ? "Liked" : "Like this talk"}
            className={!stateUser.signedIn ? classes.disabledButton : null}
            color="secondary"
            variant={isTalkLiked(talk.id) ? "contained" : "text"}
            size="small"
            onClick={_ => {
              talk.likes ? talk.likes++ : (talk.likes = 1);
              likeTalk();
            }}
            startIcon={<UpvoteIcon />}
          >
            {talk.likes || 0}
          </Button>
          {showSaveButton && <SaveButton />}
        </CardActions>
      )}
    </>
  );

  const SaveButton = ({ showLabel = true }: { showLabel?: boolean }) => (
    <>
      {isTalkSaved() ? (
        <Button
          title="Talk is saved for later. Click to unsave."
          color="secondary"
          variant="contained"
          size="small"
          onClick={_ => unsaveTalk()}
          startIcon={<UnsaveIcon />}
        >
          Saved
        </Button>
      ) : (
        <Button
          disabled={!stateUser.signedIn}
          title={
            stateUser.signedIn ? "Save for later" : "Sign in to save talks"
          }
          color="secondary"
          size="small"
          onClick={_ => saveTalk()}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      )}
    </>
  );

  return (
    <Badge
      className={classes.badge}
      color="secondary"
      invisible={!talk.isCurated}
      variant="dot"
    >
      <Card className={classes.card} elevation={0}>
        <TalkCardMedia />
        <TalkCardHeader />
        {showCuration && <TalkCardContent />}
        {showVotes && <TalkCardActions />}
      </Card>
    </Badge>
  );
};

const TalkCardTags = ({ tags }: { tags: string[] }) => {
  const classes = useStyles({});

  return (
    <Grid container>
      {tags.map(tag => (
        <Grid key={tag} item>
          <LinkPrefetch href={`/topic/[topicid]`} as={`/topic/${tag}`} passHref>
            <Link color="textSecondary" className={classes.tag}>
              #{tag}
            </Link>
          </LinkPrefetch>
        </Grid>
      ))}
    </Grid>
  );
};

export default TalkCard;
