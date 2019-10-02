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
  Avatar
} from "@material-ui/core";
import { default as NextLink } from "next/link";
import { TalkPreview } from "../schema";
import TALK_TYPES from "../constants/talkTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: "100%"
    },
    chip: {
      margin: theme.spacing(0.3, 0, 0.3, 1)
    },
    descriptionSnippet: {
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
        <Typography variant="body1" color="textSecondary" paragraph>
          No talks are available for this day.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          This probably means that there were only workshops and other types of
          events this day.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          All non-talk content is available in the{" "}
          <strong>'more content'</strong> tab (if the event organisers have made
          it available).
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
    <NextLink
      href={`/event/[eventid]/[editionid]/[talkid]`}
      as={`/event/${talk.eventId}/${talk.editionId}/${talk.id}`}
      passHref
    >
      <ListItem button onClick={onClick} component="a">
        <ListItemAvatar>
          <Avatar
            alt={`${talk.title} ${typeTitle(talk.type)}, by ${talk.speaker}`}
            src={`https://i.ytimg.com/vi/${talk.id}/default.jpg`}
          />
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
              {talk.tags.map((tag, index) =>
                highlightedTalkTag(talk, tag, index)
              )}
              {talk._highlightResult &&
                talk._snippetResult.description.matchLevel === "full" && (
                  <Typography
                    component="span"
                    className={classes.descriptionSnippet}
                    variant="body2"
                  >
                    &hellip;
                    <Snippet hit={talk} attribute="description"></Snippet>
                    &hellip;
                  </Typography>
                )}
            </>
          }
        />
      </ListItem>
    </NextLink>
  );
};

const highlightedTalkTag = (talk: TalkPreview, tag: string, index: number) => {
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
      className={classes.chip}
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
