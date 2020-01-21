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
import LinkPrefetch from "../LinkPrefetch";
import { useStores } from "../../stores/useStores";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      fontWeight: 600
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
    textInner: {},
    title: {
      fontWeight: "bolder",
      paddingBottom: theme.spacing(2),
      display: "inline-block"
    }
  })
);

interface Props {
  color?: string;
  logo?: string;
  talk: TalkBasic;
  title?: string;
}

const HubCoverText = observer(({ talk, logo, title, color }: Props) => {
  const classes = useStyles({});
  const { userStore } = useStores();
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
        {userStore.isTalkSaved(talk.id) ? (
          <Button
            size="large"
            color="secondary"
            title="Click to unsave this talk"
            onClick={_ => userStore.unsaveTalk(talk)}
            startIcon={<BookmarkIcon color="secondary" />}
          >
            Saved
          </Button>
        ) : (
          <Button
            size="large"
            color="secondary"
            title="Save this talk in My Saved Talks"
            onClick={_ => userStore.saveTalk(talk)}
            startIcon={<BookmarkOutlinedIcon color="secondary" />}
          >
            Save for later
          </Button>
        )}
      </div>
    </div>
  );
});

export default HubCoverText;
