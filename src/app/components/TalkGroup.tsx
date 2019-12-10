import {
  Grid,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { TalkGroupContents } from "../schema";
import TalkCard from "./TalkCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    group: {
      width: "100vw",
      overflow: "auto",
      paddingLeft: theme.spacing(2),
      scrollSnapType: "x mandatory",
      scrollPadding: theme.spacing(0, 0, 0, 2),
      [theme.breakpoints.up("sm")]: {
        scrollPadding: theme.spacing(0, 0, 0, 3),
        paddingLeft: theme.spacing(3)
      },
      [theme.breakpoints.up("md")]: {
        scrollPadding: theme.spacing(0, 0, 0, 4),
        paddingLeft: theme.spacing(4)
      },
      [theme.breakpoints.up("lg")]: {
        scrollPadding: theme.spacing(0, 0, 0, 8),
        paddingLeft: theme.spacing(8)
      }
    },
    groupItem: {
      flexShrink: 0,
      scrollSnapAlign: "start",
      marginBottom: theme.spacing(2),
      width: `calc((100vw - ${theme.spacing(4)}px - ${theme.spacing(
        2
      )}px) / 2)`,
      [theme.breakpoints.up("sm")]: {
        width: `calc((100vw - ${theme.spacing(6)}px - ${theme.spacing(
          3
        )}px) / 3)`
      },
      [theme.breakpoints.up("md")]: {
        width: `calc((100vw - ${theme.spacing(8)}px - ${theme.spacing(
          3
        )}px) / 4)`
      },
      [theme.breakpoints.up("lg")]: {
        width: `calc((100vw - ${theme.spacing(16)}px - ${theme.spacing(
          5
        )}px) / 5)`
      },
      [theme.breakpoints.up("xl")]: {
        width: `calc((100vw - ${theme.spacing(16)}px - ${theme.spacing(
          7
        )}px) / 7)`
      }
    },
    groupTitle: {
      margin: theme.spacing(0, 0, 2, 2),
      color: theme.palette.text.secondary,
      lineHeight: 1,
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 0, 2, 3)
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 0, 3, 4)
      },
      [theme.breakpoints.up("lg")]: {
        margin: theme.spacing(0, 0, 3, 8)
      }
    }
  })
);

interface Props {
  talkGroup: TalkGroupContents;
  showCuration?: boolean;
  showTopics?: boolean;
  showVotes?: boolean;
  showSaveButton?: boolean;
}

const TalkGroup = ({
  talkGroup,
  showCuration = false,
  showTopics = false,
  showVotes = false,
  showSaveButton = false
}: Props) => {
  const classes = useStyles({});
  const isWindows = (): boolean => {
    if (typeof window === "undefined") return false;
    const platform = window.navigator.platform;
    if (["Win32", "Win64", "Windows", "WinCE"].includes(platform)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Typography className={classes.groupTitle} variant="h4">
        {talkGroup.title}
      </Typography>
      <Grid
        container
        spacing={1}
        className={classes.group}
        wrap={isWindows() ? "wrap" : "nowrap"}
      >
        {talkGroup.talks.map(talk => (
          <Grid className={classes.groupItem} key={talk.id} item>
            <TalkCard
              talk={talk}
              showCuration={showCuration}
              showTopics={showTopics}
              showVotes={showVotes}
              showSaveButton={showSaveButton}
            ></TalkCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TalkGroup;
