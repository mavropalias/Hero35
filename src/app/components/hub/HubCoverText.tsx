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
  BookmarkBorder as BookmarkOutlinedIcon
} from "@material-ui/icons";
import { TalkBasic } from "../../schema";
import { useContext, useState } from "react";
import { UserContext } from "../context-providers/UserContextProvider";
import Database from "../../services/Database";
import LinkPrefetch from "../LinkPrefetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      },
      [theme.breakpoints.up("lg")]: {
        margin: theme.spacing(0, 8)
      }
    },
    textInner: {},
    title: {
      fontWeight: "bolder",
      paddingBottom: theme.spacing(2),
      display: "inline-block"
    },
    description: {
      fontWeight: 600
    }
  })
);

interface Props {
  color?: string;
  logo?: string;
  talk: TalkBasic;
  title?: string;
}

const HubCoverText = ({ talk, logo, title, color }: Props) => {
  const classes = useStyles({});
  const { state: stateUser, dispatch } = useContext(UserContext);
  const [optimisticTalkState, setOptimisticTalkState] = useState<
    "saved" | "unsaved" | "liked" | ""
  >("");
  const [error, setError] = useState("");

  const saveTalk = async () => {
    try {
      setError("");
      setOptimisticTalkState("saved");
      const updatedUser = await Database.saveTalkInUserProfile(talk.id);
      dispatch({
        type: "HYDRATE_FROM_DB",
        payload: { ...updatedUser }
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setOptimisticTalkState("");
    }
  };

  const unsaveTalk = async () => {
    try {
      setError("");
      setOptimisticTalkState("unsaved");
      const updatedUser = await Database.unsaveTalkInUserProfile(talk.id);
      dispatch({
        type: "HYDRATE_FROM_DB",
        payload: { ...updatedUser }
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setOptimisticTalkState("");
    }
  };

  const isTalkSaved = (talkId: string): boolean =>
    (stateUser.savedTalks.filter(savedTalk => savedTalk.id === talkId).length >
      0 ||
      optimisticTalkState === "saved") &&
    optimisticTalkState !== "unsaved";

  return (
    <div className={classes.text}>
      <div className={classes.textInner}>
        {logo && title && (
          <Box display="flex" alignItems="center" marginBottom={2}>
            <img src={logo} className={classes.hubLogo} />
            <Typography variant="h4" className={classes.hubTitle}>
              {title}
            </Typography>
          </Box>
        )}
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
        <Typography variant="h4" className={classes.description} gutterBottom>
          {talk.curationDescription}
        </Typography>
        {isTalkSaved(talk.id) ? (
          <Button
            size="large"
            color="secondary"
            disabled={!stateUser.signedIn}
            title="Remove this saved talk"
            onClick={_ => unsaveTalk()}
            startIcon={<BookmarkIcon color="secondary" />}
          >
            Saved
          </Button>
        ) : (
          <Button
            size="large"
            color="secondary"
            disabled={!stateUser.signedIn}
            title="Save this talk in your Saved Talks"
            onClick={_ => saveTalk()}
            startIcon={<BookmarkOutlinedIcon color="secondary" />}
          >
            Save for later
          </Button>
        )}
      </div>
    </div>
  );
};

const LogoAndTitle = ({ logo, title }: { logo: string; title: string }) => (
  <>{title}</>
);

export default HubCoverText;
