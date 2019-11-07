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
  Chip
} from "@material-ui/core";
import { default as NextLink } from "next/link";
import { EventEdition } from "../schema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { height: "100%" },
    content: { textAlign: "center" },
    distinctiveEdition: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
      borderRadius: theme.shape.borderRadius,
      height: "100%"
    },
    link: { textDecoration: "none" },
    media: {
      height: 48,
      backgroundSize: "contain",
      margin: theme.spacing(2, 1, 0, 1)
    },
    tag: { margin: theme.spacing(1, 1, 0, 0) }
  })
);

interface Props {
  editions?: EventEdition[];
}

const EditionGrid = ({ editions }) => {
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
      <Grid container spacing={4}>
        {editions.map(edition => (
          <Grid
            key={`${edition.eventId}${edition.id}`}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <NextLink
              href={`/[eventid]/[editionid]`}
              as={`/${edition.eventId}/${edition.id}`}
            >
              <a className={classes.link}>
                <Card
                  raised={false}
                  className={
                    edition.isDistinctive
                      ? classes.distinctiveEdition
                      : classes.card
                  }
                >
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={`${process.env.STORAGE_PATH}${encodeURIComponent(
                        edition.logo
                      )}?alt=media`}
                    />
                    <CardContent className={classes.content}>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        component="span"
                      >
                        {edition.eventTitle} {edition.title}
                      </Typography>
                      {edition.isDistinctive ? (
                        <Typography gutterBottom>
                          <Chip
                            color="secondary"
                            size="small"
                            label="Distinctive event"
                            className={classes.tag}
                            component="span"
                          ></Chip>
                        </Typography>
                      ) : (
                        <Typography variant="subtitle2" color="textSecondary">
                          {(edition.durationMinutes / 60).toFixed(0)} hours of
                          content
                        </Typography>
                      )}
                      <Typography variant="caption" color="textSecondary">
                        {editionDateStart(edition)}, {edition.country}
                      </Typography>
                      <div>
                        {edition.topTags &&
                          edition.topTags.map((tag, index) => (
                            <Chip
                              key={index}
                              size="small"
                              variant="outlined"
                              label={tag}
                              className={classes.tag}
                            />
                          ))}
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </a>
            </NextLink>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default EditionGrid;
