import {
  Grid,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { TalkGroupContents, TalkPreview, TalkBasic } from "../schema";
import TalkCardBasic from "./TalkCardBasic";
import STACKS from "../constants/stacks";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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
        width: `calc((100vw - ${theme.spacing(8)}px - ${theme.spacing(
          5
        )}px) / 5)`
      },
      [theme.breakpoints.up("xl")]: {
        width: `calc((100vw - ${theme.spacing(8)}px - ${theme.spacing(
          6
        )}px) / 6)`
      }
    },
    groupTitle: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(0, 0, 2, 2),
      color: theme.palette.text.secondary,
      lineHeight: 1,
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 0, 2, 3)
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 0, 3, 4)
      }
    },
    groupIcon: {
      maxWidth: theme.spacing(4),
      height: theme.spacing(4),
      margin: theme.spacing(0, 1.5, 0, 0)
    }
  })
);

interface Props {
  talkGroup: TalkGroupContents;
}

const TalkGroup = ({ talkGroup }: Props) => {
  const classes = useStyles({});
  const isWindows = (): boolean => {
    if (typeof window === "undefined") return false;
    const platform = window.navigator.platform;
    if (["Win32", "Win64", "Windows", "WinCE"].includes(platform)) {
      return true;
    }
    return false;
  };
  const groupIcon = (slug?: string) => {
    const iconSlug = STACKS.find(stack => stack.slug === slug)?.slug;
    if (iconSlug) {
      return (
        <img
          src={`/stacks/${iconSlug}.svg`}
          className={classes.groupIcon}
          alt=""
        />
      );
    } else {
      return <></>;
    }
  };
  const Talk = ({ index, style }) => (
    <article style={style} className={classes.groupItem}>
      <TalkCardBasic talk={talkGroup.talks[index]}></TalkCardBasic>
    </article>
  );
  return (
    <>
      <Typography className={classes.groupTitle} variant="h4">
        {groupIcon(talkGroup.slug)}
        {talkGroup.title}
      </Typography>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={200}
            itemCount={talkGroup.talks.length}
            itemSize={200}
            layout="horizontal"
            width={width}
            className={classes.group}
          >
            {Talk}
          </List>
        )}
      </AutoSizer>
      {/* <Grid
        container
        spacing={1}
        className={classes.group}
        wrap={isWindows() ? "wrap" : "nowrap"}
      > */}
      {/* {((talkGroup.talks as unknown) as TalkBasic[]).map(talk => (
          <Grid
            className={classes.groupItem}
            key={talk.id}
            item
            component="article"
          >
            <TalkCardBasic talk={talk}></TalkCardBasic>
          </Grid>
        ))} */}
      {/* </Grid> */}
    </>
  );
};

export default TalkGroup;
