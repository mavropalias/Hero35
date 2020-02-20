import {
  Card,
  CardActionArea,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  Button,
  CardHeader,
  Box,
  Paper,
  Typography
} from "@material-ui/core";
import {
  Bookmark as UnsaveIcon,
  BookmarkBorder as SaveIcon
} from "@material-ui/icons";
import { TalkBasic } from "../schema";
import LinkPrefetch from "./LinkPrefetch";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/useStores";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
      "&:hover": {
        "& .controls": {
          opacity: 1
        },
        "& .description": {
          opacity: 1
        }
      }
    },
    header: {
      padding: theme.spacing(1, 0, 0, 0)
    },
    headerTitle: {
      position: "relative",
      height: "2.66em",
      overflow: "hidden",
      textOverflow: "ellipsis",
      "& .controls": {
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: theme.palette.background.default,
        width: "100%",
        height: "100%",
        textAlign: "center",
        transition: theme.transitions.create("opacity")
      }
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
        height: "100%",
        opacity: 0,
        transition: theme.transitions.create("opacity")
      }
    }
  })
);

const TalkCardHeader = ({ talk }: { talk: TalkBasic }) => {
  const classes = useStyles({});
  return (
    <CardHeader
      title={
        <>
          {talk.title}
          <div className="controls">
            <SaveButton talk={talk} />
          </div>
        </>
      }
      className={classes.header}
      classes={{ title: classes.headerTitle }}
    />
  );
};

const TalkCardMedia = ({ talk }: { talk: TalkBasic }) => {
  const classes = useStyles({});
  return (
    <LinkPrefetch
      href={`/[eventid]/[editionid]/[talkslug]`}
      as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
    >
      <a className={classes.link}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`https://i.ytimg.com/vi/${talk.youtubeId ||
              talk.id}/hq${talk.coverImage || "default"}.jpg`}
          >
            {talk.curationDescription && <TalkInfo talk={talk} />}
          </CardMedia>
        </CardActionArea>
      </a>
    </LinkPrefetch>
  );
};

const TalkInfo = ({ talk }: { talk: TalkBasic }) => (
  <Box className="description">
    <Paper elevation={0}>
      <Box padding={1}>
        <Typography variant="body2">{talk.curationDescription}</Typography>
      </Box>
    </Paper>
  </Box>
);

const SaveButton = observer(({ talk }: { talk: TalkBasic }) => {
  const { userStore } = useStores();
  return (
    <>
      {userStore.isTalkSaved(talk.id) ? (
        <Button
          title="Talk is saved for later. Click to unsave."
          color="secondary"
          variant="contained"
          size="small"
          onClick={_ => userStore.unsaveTalk(talk)}
          startIcon={<UnsaveIcon />}
        >
          Saved
        </Button>
      ) : (
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={_ => userStore.saveTalk(talk)}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      )}
    </>
  );
});

interface Props {
  talk: TalkBasic;
}

const TalkCardBasic = ({ talk }: Props) => {
  const classes = useStyles({});
  return (
    <Card className={classes.card} elevation={0}>
      <TalkCardMedia talk={talk} />
      <TalkCardHeader talk={talk} />
    </Card>
  );
};

export default TalkCardBasic;
