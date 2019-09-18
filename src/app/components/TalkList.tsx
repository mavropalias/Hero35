import {
  createStyles,
  makeStyles,
  Theme,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import {
  Highlight as HighlightsIcon,
  FlashOn as LightningTalkIcon,
  Mic as InterviewIcon,
  Money as SponsorIcon,
  PanTool as QAIcon,
  People as PanelIcon,
  PersonalVideo as TalkIcon,
  Public as KeynoteIcon,
  School as WorkshopIcon
} from "@material-ui/icons";
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
    keynoteIcon: {
      color: "#4CD964"
    },
    lightningTalkIcon: {
      color: "#FF2D55"
    },
    panelIcon: {
      color: "#FF9500"
    },
    sponsorIcon: {
      color: "#FFCC00"
    },
    qaIcon: {
      color: "#5856D6"
    },
    workshopIcon: {
      color: "#007AFF"
    },
    interviewIcon: {
      color: "#FF3B30"
    },
    highlightsIcon: {
      color: "#C7FF00"
    },
    talkIcon: {
      color: "#5AC8FA"
    }
  })
);

const TalkList = ({ talks }: { talks: TalkPreview[] }) => {
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
          <strong>'more content'</strong> tab.
        </Typography>
      </Box>
    );
  }

  return (
    <List className={classes.list}>
      {talks.map(talk => (
        <TalkListItem key={talk.id} talk={talk} />
      ))}
    </List>
  );
};

const TalkListItem = ({ talk }: { talk: TalkPreview }) => {
  const classes = useStyles({});

  const typeTitle = (id: string) =>
    TALK_TYPES.filter(type => type.id === id)[0].title.toLowerCase();

  return (
    <NextLink
      href={`/event/[eventid]/[editionid]/[talkid]`}
      as={`/event/${talk.eventId}/${talk.editionId}/${talk.id}`}
      passHref
    >
      <ListItem button component="a">
        <ListItemAvatar>
          <Avatar
            alt={`${talk.title} ${typeTitle(talk.type)}, by ${talk.speaker}`}
            src={`https://i.ytimg.com/vi/${talk.id}/default.jpg`}
          />
        </ListItemAvatar>
        <ListItemText
          primary={talk.title}
          secondary={
            <>
              {`${talk.speaker} - ${talk.times && talk.times.totalMins} mins`}
              {talk.tags.map(tag => (
                <Chip
                  color="default"
                  variant="outlined"
                  size="small"
                  key={tag}
                  label={`#${tag}`}
                  className={classes.chip}
                ></Chip>
              ))}
            </>
          }
        />
      </ListItem>
    </NextLink>
  );
};

export default TalkList;
