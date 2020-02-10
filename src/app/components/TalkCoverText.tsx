import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Box,
  Link
} from "@material-ui/core";
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkOutlinedIcon,
  PlayArrowSharp as PlayIcon,
  ThumbUp as VotedUp,
  ThumbUpOutlined as VoteUp
} from "@material-ui/icons";
import { TalkBasic } from "../schema";
import LinkPrefetch from "./LinkPrefetch";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react-lite";
import Router from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      padding: theme.spacing(2, 4),
      marginRight: theme.spacing(2),
      fontSize: theme.typography.fontSize * 1.7,
      lineHeight: 1
    },
    buttonIcon: {
      "& > :first-child": {
        fontSize: theme.typography.fontSize * 3
      }
    },
    description: {
      fontWeight: 600,
      marginBottom: theme.spacing(4)
    },
    hubLogo: {
      maxWidth: theme.spacing(8),
      maxHeight: theme.spacing(8),
      marginRight: theme.spacing(1)
    },
    hubTitle: { textTransform: "capitalize", fontWeight: 500 },
    text: {
      position: "relative",
      margin: theme.spacing(0, 2),
      maxWidth: "48rem",
      zIndex: 1,
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 3)
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 4)
      }
    },
    title: {
      fontWeight: 800,
      paddingBottom: theme.spacing(2),
      display: "inline-block",
      lineHeight: 1
    }
  })
);

interface Props {
  color?: string;
  logo?: string;
  shouldLinkTitle?: boolean;
  talk: TalkBasic;
  title?: string;
}

const TalkCoverText = observer(
  ({ color, logo, shouldLinkTitle = true, talk, title }: Props) => {
    const classes = useStyles({});
    const { userStore } = useStores();

    const handlePlay = () => {
      userStore.setShouldAutoPlayNextTalk(true);
      userStore.setIsAboutToPlayTalk(false);
      Router.push(
        `/[eventid]/[editionid]/[talkslug]`,
        `/${talk.eventId}/${talk.editionId}/${talk.slug}`
      );
    };

    const handleMouseOver = () => {
      userStore.setIsAboutToPlayTalk(true);
    };

    const handleMouseOut = () => {
      userStore.setIsAboutToPlayTalk(false);
    };

    return (
      <div className={classes.text}>
        {title && (
          <Box display="flex" alignItems="center" marginBottom={2}>
            {logo && <img src={logo} className={classes.hubLogo} />}
            <Typography variant="h4" className={classes.hubTitle}>
              {title}
            </Typography>
          </Box>
        )}
        {talk.isCurated && (
          <Typography
            variant="overline"
            color="textSecondary"
            style={color ? { color } : {}}
            component="p"
          >
            Editor's Choice
          </Typography>
        )}
        {shouldLinkTitle ? (
          <LinkPrefetch
            href={`/[eventid]/[editionid]/[talkslug]`}
            as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
            passHref
          >
            <Link
              variant="h2"
              className={classes.title}
              style={color ? { color } : {}}
            >
              {talk.title}
            </Link>
          </LinkPrefetch>
        ) : (
          <Typography variant="h2" className={classes.title}>
            {talk.title}
          </Typography>
        )}
        <Typography
          variant="h4"
          component="p"
          className={classes.description}
          color={shouldLinkTitle ? "textPrimary" : "textSecondary"}
        >
          {talk.curationDescription}
        </Typography>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          className={classes.button}
          classes={{ iconSizeLarge: classes.buttonIcon }}
          onClick={handlePlay}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          startIcon={<PlayIcon />}
        >
          Play
        </Button>
        {userStore.isTalkSaved(talk.id) ? (
          <Button
            size="large"
            color="secondary"
            variant="outlined"
            className={classes.button}
            classes={{ iconSizeLarge: classes.buttonIcon }}
            title="Unsave this talk"
            onClick={_ => userStore.unsaveTalk(talk)}
            startIcon={<BookmarkIcon />}
          >
            Saved
          </Button>
        ) : (
          <Button
            size="large"
            color="secondary"
            className={classes.button}
            classes={{ iconSizeLarge: classes.buttonIcon }}
            title="Save this talk in My Saved Talks"
            onClick={_ => userStore.saveTalk(talk)}
            startIcon={<BookmarkOutlinedIcon color="secondary" />}
          >
            Save
          </Button>
        )}
        <Button
          color="secondary"
          variant={userStore.isTalkLiked(talk.id) ? "outlined" : "text"}
          className={classes.button}
          classes={{ iconSizeLarge: classes.buttonIcon }}
          size="large"
          startIcon={userStore.isTalkLiked(talk.id) ? <VotedUp /> : <VoteUp />}
          onClick={_ => userStore.likeTalk(talk.id)}
        >
          {userStore.isTalkLiked(talk.id) ? "Liked" : "Like"}
        </Button>
      </div>
    );
  }
);

export default TalkCoverText;
