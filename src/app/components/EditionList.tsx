import {
  createStyles,
  makeStyles,
  Theme,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { EventEdition } from "../schema";
import LinkPrefetch from "./LinkPrefetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    distinctiveEdition: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
      borderRadius: theme.shape.borderRadius
    },
    list: {
      width: "100%"
    },
    chip: {
      margin: theme.spacing(0.3, 0, 0.3, 1),
      pointerEvents: "none",
      borderColor: `rgba(255,255,255,.1)`
      // color: theme.palette.text.secondary
    }
  })
);

const EditionList = ({
  editions,
  label
}: {
  editions: EventEdition[];
  label?: string;
}) => {
  const classes = useStyles({});

  const editionDateStart = (edition: EventEdition) => {
    const startDate = new Date(edition.startDate);
    var options = {
      month: "short",
      day: "numeric"
    };

    return startDate.toLocaleDateString(undefined, options);
  };

  return (
    <List
      subheader={
        label && <ListSubheader component="span">{label}</ListSubheader>
      }
      className={classes.list}
      component="nav"
    >
      {editions.map(edition => (
        <LinkPrefetch
          href={`/[eventid]/[editionid]`}
          as={`/${edition.eventId}/${edition.id}`}
          passHref
          key={`${edition.eventId}${edition.id}`}
        >
          <ListItem
            divider
            button
            component="a"
            key={edition.id}
            className={edition.isDistinctive ? classes.distinctiveEdition : ""}
          >
            <ListItemAvatar>
              <Avatar
                component="span"
                alt={`${edition.eventTitle} ${edition.title} logo`}
                src={`${process.env.STORAGE_PATH}${encodeURIComponent(
                  edition.logo
                )}?alt=media`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${edition.eventTitle} ${edition.title}`}
              secondary={
                <>
                  {edition.durationMinutes ? (
                    <>
                      {(edition.durationMinutes / 60).toFixed(1)} hours of
                      content
                    </>
                  ) : (
                    <>
                      {editionDateStart(edition)} at {edition.city},{" "}
                      {edition.country}
                    </>
                  )}
                  {edition.isDistinctive && (
                    <Chip
                      color="secondary"
                      component="span"
                      size="small"
                      label="Distinctive event"
                      className={classes.chip}
                    ></Chip>
                  )}
                  {edition.topTags && (
                    <>
                      {edition.topTags.map((tag, index) => (
                        <Chip
                          color="default"
                          component="span"
                          variant="outlined"
                          size="small"
                          key={index}
                          label={tag}
                          className={classes.chip}
                        ></Chip>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </ListItem>
        </LinkPrefetch>
      ))}
    </List>
  );
};

export default EditionList;
