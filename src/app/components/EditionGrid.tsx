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
  Badge
} from "@material-ui/core";
import { EventEdition } from "../schema";
import React from "react";
import DistinctiveTooltip from "./DistinctiveTooltip";
import LinkPrefetch from "./LinkPrefetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea: {
      display: "flex",
      height: "100%"
    },
    badge: { height: "100%", width: "100%" },
    card: { flex: 1 },
    container: { overflow: "hidden" },
    content: { flex: 1 },
    item: {
      flexShrink: 0
    },
    link: { textDecoration: "none" },
    logo: {
      height: "100%",
      maxHeight: "50px",
      maxWidth: "50px",
      borderRadius: theme.shape.borderRadius
    },
    media: {
      display: "flex",
      width: "50px",
      boxSizing: "border-box",
      margin: theme.spacing(2, 0, 2, 2)
    }
  })
);

interface Props {
  editions: EventEdition[];
  variant?: "horizontal" | "vertical";
  hideDate?: boolean;
  hideTalkCount?: boolean;
}

const EditionGrid = ({
  editions,
  variant = "vertical",
  hideDate,
  hideTalkCount
}: Props) => {
  const classes = useStyles({});

  const editionDateStart = (edition: EventEdition) => {
    const startDate = new Date(edition.startDate);
    var options = {
      month: "short",
      year: "numeric"
    };

    return startDate.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Grid
        className={classes.container}
        container
        spacing={2}
        wrap={variant === "horizontal" ? "nowrap" : "wrap"}
      >
        {editions.map(edition => (
          <Grid
            className={classes.item}
            key={`${edition.eventId}${edition.id}`}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <LinkPrefetch
              href={`/[eventid]/[editionid]`}
              as={`/${edition.eventId}/${edition.id}`}
            >
              <a className={classes.link}>
                <Badge
                  color="secondary"
                  variant="dot"
                  className={classes.badge}
                  invisible={!edition.isDistinctive}
                >
                  <DistinctiveTooltip
                    title="Distinctive event"
                    disableFocusListener={!edition.isDistinctive}
                    disableHoverListener={!edition.isDistinctive}
                    disableTouchListener={!edition.isDistinctive}
                  >
                    <Card raised={false} className={classes.card}>
                      <CardActionArea className={classes.actionArea}>
                        <CardMedia className={classes.media}>
                          <img
                            className={classes.logo}
                            src={`${
                              process.env.STORAGE_PATH
                            }${encodeURIComponent(edition.logo)}?alt=media`}
                          ></img>
                        </CardMedia>
                        <CardContent className={classes.content}>
                          <Typography variant="subtitle2" color="primary">
                            {edition.eventTitle} {edition.title}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {!hideTalkCount && edition.talks && (
                              <>{edition.talks.length} talks, </>
                            )}
                            {!hideDate && <>{editionDateStart(edition)}, </>}
                            {edition.country}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </DistinctiveTooltip>
                </Badge>
              </a>
            </LinkPrefetch>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default EditionGrid;
