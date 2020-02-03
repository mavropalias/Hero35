import { Highlight, Snippet } from "react-instantsearch-dom";
import {
  createStyles,
  makeStyles,
  Theme,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  ListItemAvatar,
  Avatar,
  IconButton
} from "@material-ui/core";
import { Stars as CuratedIcon } from "@material-ui/icons";
import { TalkPreview } from "../schema";
import TALK_TYPES from "../constants/talkTypes";
import LinkPrefetch from "./LinkPrefetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    curatedAvatar: {
      backgroundColor: theme.palette.secondary.main
    },
    list: {
      width: "100%"
    },
    chip: {
      margin: theme.spacing(0.3, 1, 0.3, 0),
      pointerEvents: "none"
    },
    chipDefault: {
      borderColor: `rgba(255,255,255,.1)`,
      color: theme.palette.text.secondary
    },
    tagsContainer: {
      marginLeft: theme.spacing(1)
    },
    textBlock: {
      display: "block"
    }
  })
);

const TalkList = ({
  talks,
  onClick,
  showEvent
}: {
  talks: TalkPreview[];
  onClick?: any;
  showEvent?: boolean;
}) => {
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
    <List className={classes.list}>
      {talks.map(talk => (
        <TalkListItem
          key={talk.id}
          talk={talk}
          onClick={onClick}
          showEvent={showEvent}
        />
      ))}
    </List>
  );
};

const TalkListItem = ({
  talk,
  onClick,
  showEvent
}: {
  talk: TalkPreview;
  onClick?: any;
  showEvent?: boolean;
}) => {
  const classes = useStyles({});
  const typeTitle = (id: string) =>
    TALK_TYPES.filter(type => type.id === id)[0].title.toLowerCase();

  return (
    <LinkPrefetch
      href={`/[eventid]/[editionid]/[talkslug]`}
      as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
      passHref
    >
      <ListItem divider button onClick={onClick} component="a">
        <ListItemAvatar>
          {talk.isCurated ? (
            <Avatar className={classes.curatedAvatar}>
              <IconButton>
                <CuratedIcon />
              </IconButton>
            </Avatar>
          ) : (
            <Avatar
              alt={`${talk.title} ${typeTitle(talk.type)}, by ${talk.speaker}`}
              src={`https://i.ytimg.com/vi/${talk.youtubeId ||
                talk.id}/${talk.coverImage || "default"}.jpg`}
            />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={highlightedTalkAttribute(talk, "title")}
          secondary={
            <>
              {showEvent && (
                <>
                  {highlightedTalkAttribute(talk, "eventTitle")}{" "}
                  {highlightedTalkAttribute(talk, "editionTitle")}
                  {" - "}
                </>
              )}
              {highlightedTalkAttribute(talk, "speaker")}
              {` - ${talk.times && talk.times.totalMins} mins`}
              {talk.tags.length > 0 && (
                <span className={classes.tagsContainer}>
                  {talk.tags.map((tag, index) => (
                    <HighlightedTalkTag
                      talk={talk}
                      tag={tag}
                      index={index}
                      key={index}
                    />
                  ))}
                </span>
              )}
              {talk._highlightResult &&
                talk._snippetResult.description.matchLevel === "full" && (
                  <Typography
                    component="span"
                    className={classes.textBlock}
                    variant="body2"
                  >
                    &hellip;
                    <Snippet hit={talk} attribute="description"></Snippet>
                    &hellip;
                  </Typography>
                )}
              {talk.isCurated && (
                <Typography
                  component="span"
                  className={classes.textBlock}
                  variant="body2"
                >
                  <strong>EDITOR'S CHOICE:</strong>&nbsp;
                  {talk.curationDescription}
                </Typography>
              )}
            </>
          }
        />
      </ListItem>
    </LinkPrefetch>
  );
};

const HighlightedTalkTag = ({
  talk,
  tag,
  index
}: {
  talk: TalkPreview;
  tag: string;
  index: number;
}) => {
  const classes = useStyles({});
  if (talk._highlightResult) {
    let match = "";
    if (talk._highlightResult.tags[index].fullyHighlighted === true) {
      return (
        <Chip
          color="secondary"
          variant="outlined"
          size="small"
          component="span"
          key={tag}
          label={tag}
          className={classes.chip}
        ></Chip>
      );
    } else if (
      talk._highlightResult.tags.find(talkTag => {
        if (tag.includes(talkTag.matchedWords[0])) {
          match = talkTag.matchedWords[0];
          return true;
        } else {
          return false;
        }
      })
    ) {
      return (
        <Chip
          color="default"
          variant="outlined"
          size="small"
          component="span"
          key={tag}
          label={
            <span
              dangerouslySetInnerHTML={{
                __html: tag.replace(
                  match,
                  `<span class="highlighted-text">${match}</span>`
                )
              }}
            ></span>
          }
          className={classes.chip}
        ></Chip>
      );
    }
  }
  return (
    <Chip
      color="default"
      variant="outlined"
      size="small"
      component="span"
      key={tag}
      label={tag}
      className={`${classes.chip} ${classes.chipDefault}`}
    ></Chip>
  );
};

const highlightedTalkAttribute = (talk: TalkPreview, attr: string) => {
  if (talk._highlightResult && talk._highlightResult[attr]) {
    return <Highlight hit={talk} attribute={attr} />;
  }
  return talk[attr];
};

export default TalkList;
