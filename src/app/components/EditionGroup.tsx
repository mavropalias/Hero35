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
import React, { useState, useEffect } from "react";
import DistinctiveTooltip from "./DistinctiveTooltip";
import LinkPrefetch from "./LinkPrefetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea: {
      padding: theme.spacing(0, 1, 1, 1)
    },
    badge: { height: "100%", width: "100%", display: "block" },
    card: { backgroundColor: "transparent" },
    content: {
      padding: theme.spacing(2, 0, 0, 0)
    },
    edition: {
      flexShrink: 0,
      scrollSnapAlign: "start",
      marginBottom: theme.spacing(2),
      width: theme.spacing(24),
      textAlign: "center"
    },
    link: { textDecoration: "none" },
    logo: {
      maxWidth: "100%",
      height: theme.spacing(8)
    },
    media: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(2)
    },
    group: {
      width: "100%",
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
    title: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  })
);

interface Props {
  editions: EventEdition[];
}

const EditionGroup = ({ editions }: Props) => {
  const [isWindows, setIsWindows] = useState(false);
  const classes = useStyles({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const platform = window.navigator.platform;
      if (["Win32", "Win64", "Windows", "WinCE"].includes(platform)) {
        setIsWindows(true);
      } else {
        setIsWindows(false);
      }
    }
  }, [typeof window !== "undefined"]);

  return (
    <>
      <Grid
        className={classes.group}
        container
        spacing={3}
        wrap={isWindows ? "wrap" : "nowrap"}
      >
        {editions.map(edition => (
          <Grid
            className={classes.edition}
            key={`${edition.eventId}${edition.id}`}
            component="article"
            item
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
                    <Card raised={false} elevation={0} className={classes.card}>
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
                          <Typography className={classes.title}>
                            {edition.eventTitle}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {edition.isJustAdded && "Just added"}
                            {edition.isUpcoming && "Upcoming"}
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

export default EditionGroup;
