import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Box,
  Avatar,
  Grid,
  Link,
  Paper,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { TalkBasic } from "../schema";
import LinkPrefetch from "./LinkPrefetch";
import TalkControls from "./TalkControls";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chartContainer: {
      width: "100%"
    },
    itemContainer: {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.palette.background.paper
      }
    },
    talkThumbnail: {
      maxHeight: theme.spacing(14),
      margin: theme.spacing(2, 2, 2, 0)
    }
  })
);
const TalkChart = ({ talks }: { talks: TalkBasic[] }) => {
  const classes = useStyles({});
  if (talks.length === 0) {
    return (
      <Box m={3}>
        <Typography variant="body1" color="textSecondary">
          No talks available.
        </Typography>
      </Box>
    );
  }
  return (
    <Grid container spacing={2} className={classes.chartContainer}>
      {talks.map((talk, index) => (
        <Grid item xs={12} key={index}>
          <TalkChartItem key={talk.id} talk={talk} position={index + 1} />
        </Grid>
      ))}
    </Grid>
  );
};

const TalkChartItem = ({
  talk,
  position
}: {
  talk: TalkBasic;
  position: number;
}) => {
  const [elevation, setElevation] = useState(0);
  const classes = useStyles({});
  const theme = useTheme();
  const flexDirection = useMediaQuery(theme.breakpoints.down("sm"))
    ? "column"
    : "row";
  return (
    <Paper
      elevation={elevation}
      onMouseOver={_ => setElevation(6)}
      onMouseOut={_ => setElevation(0)}
      className={classes.itemContainer}
    >
      <Box
        display="flex"
        flexDirection={flexDirection}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box m={2} marginRight={4}>
          <Avatar>{position}</Avatar>
        </Box>
        <Box display="flex">
          <LinkPrefetch
            href={`/[eventid]/[editionid]/[talkslug]`}
            as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
          >
            <a>
              <img
                className={classes.talkThumbnail}
                alt={`${talk.title} by ${talk.speaker}`}
                src={`https://i.ytimg.com/vi/${talk.youtubeId ||
                  talk.id}/mq${talk.coverImage || "default"}.jpg`}
              />
            </a>
          </LinkPrefetch>
        </Box>
        <Box m={1} flex="1" display="flex" flexDirection="column">
          <LinkPrefetch
            href={`/[eventid]/[editionid]/[talkslug]`}
            as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
            passHref
          >
            <Link>
              <Typography variant="h6" component="h3">
                {talk.title}
              </Typography>
              <Typography variant="caption" color="textSecondary" paragraph>
                {talk.speaker} at {talk.eventTitle} {talk.editionTitle}
              </Typography>
            </Link>
          </LinkPrefetch>
          <TalkControls talk={talk} size="small" />
        </Box>
      </Box>
    </Paper>
  );
};

export default TalkChart;
