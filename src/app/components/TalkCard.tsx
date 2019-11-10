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
  Link
} from "@material-ui/core";
import {
  ArrowUpward as UpvoteIcon,
  Bookmark as UnsaveIcon,
  BookmarkBorder as SaveIcon
} from "@material-ui/icons";
import { default as NextLink } from "next/link";
import { NextPage } from "next";
import { Talk } from "../schema";
import { useContext } from "react";
import { UserContext } from "./context-providers/UserContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: "100%",
      backgroundColor: "transparent"
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
  className?: string;
}

const TalkCard: NextPage<Props> = ({ talk, showCuration, className }) => {
  const { state: stateUser, dispatch } = useContext(UserContext);
  const classes = useStyles({});

  const talkTime = (talk: Talk) => {
    return `${talk.times.h ? `${talk.times.h}:` : ""}
                        ${talk.times.m}${talk.times.m < 10 ? "0" : ""}:${
      talk.times.s
    }${talk.times.s < 10 ? "0" : ""}`;
  };

  return (
    <Card className={classes.card} elevation={0}>
      <NextLink
        href={`/[eventid]/[editionid]/[talkslug]`}
        as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
      >
        <a className={classes.link}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://i.ytimg.com/vi/${talk.youtubeId ||
                talk.id}/sddefault.jpg`}
            >
              {talk.isCurated && (
                <Paper className={classes.curated}>
                  <Box m={0.5} marginLeft={1} marginRight={1}>
                    <Typography variant="caption">Editor's choice</Typography>
                  </Box>
                </Paper>
              )}
              <Typography variant="caption" className={classes.time}>
                {talkTime(talk)}
              </Typography>
            </CardMedia>
          </CardActionArea>
        </a>
      </NextLink>
      <CardContent>
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
          <Grid item hidden>
            {stateUser.savedTalks.find(
              savedTalk => savedTalk.id === talk.id
            ) ? (
              <IconButton title="Talk is saved for later. Click to unsave.">
                <UnsaveIcon color="secondary" />
              </IconButton>
            ) : (
              <IconButton title="Save for later">
                <SaveIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
        {showCuration && talk.isCurated && (
          <>
            <Typography variant="body2">{talk.curationDescription}</Typography>
          </>
        )}
      </CardContent>
    </Card>
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
