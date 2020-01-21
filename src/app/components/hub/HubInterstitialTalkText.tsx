import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Button,
  Link
} from "@material-ui/core";
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkOutlinedIcon
} from "@material-ui/icons";
import { TalkBasic } from "../../schema";
import { useState } from "react";
import LinkPrefetch from "../LinkPrefetch";
import { useStores } from "../../stores/useStores";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      position: "relative",
      padding: theme.spacing(12, 2),
      maxWidth: "48rem",
      minHeight: "500px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      zIndex: 1,
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(12, 3)
      },
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(12, 4)
      },
      [theme.breakpoints.up("lg")]: {
        padding: theme.spacing(12, 8)
      }
    },
    title: {
      paddingBottom: theme.spacing(2),
      fontWeight: "bolder",
      display: "inline-block"
    },
    description: {
      fontWeight: 600
    }
  })
);

interface Props {
  talk: TalkBasic;
  color?: string;
}

const HubInterstitialTalkText = observer(({ talk, color }: Props) => {
  const classes = useStyles({});
  const { userStore } = useStores();
  return (
    <div className={classes.text}>
      <LinkPrefetch
        href={`/[eventid]/[editionid]/[talkslug]`}
        as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
        passHref
      >
        <Link
          variant="h3"
          className={classes.title}
          style={color ? { color } : {}}
        >
          {talk.title}
        </Link>
      </LinkPrefetch>
      <Typography variant="h5" className={classes.description} gutterBottom>
        {talk.curationDescription}
      </Typography>
      {userStore.isTalkSaved(talk.id) ? (
        <Button
          size="large"
          color="secondary"
          title="Remove this saved talk"
          onClick={_ => userStore.unsaveTalk(talk)}
          startIcon={<BookmarkIcon color="secondary" />}
        >
          Saved
        </Button>
      ) : (
        <Button
          size="large"
          color="secondary"
          title="Save this talk in your Saved Talks"
          onClick={_ => userStore.saveTalk(talk)}
          startIcon={<BookmarkOutlinedIcon color="secondary" />}
        >
          Save for later
        </Button>
      )}
    </div>
  );
});

export default HubInterstitialTalkText;
