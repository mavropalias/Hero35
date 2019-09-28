import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
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
    card: { height: "100%", background: "transparent" },
    content: { textAlign: "center" },
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
  className?: string;
}

const EditionGrid = ({ editions, className }) => {
  const classes = useStyles({});

  const editionDateStart = (edition: EventEdition) => {
    const startDate = new Date(edition.startDate);
    var options = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };

    return startDate.toLocaleDateString(undefined, options);
  };

  return (
    <Container className={className}>
      <Typography variant="h5" component="h2">
        Recent React developer conferences
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        View talks, workshops, and more from the most recent React conferences.
      </Typography>
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
              href={`/event/[eventid]/[editionid]`}
              as={`/event/${edition.eventId}/${edition.id}`}
            >
              <a className={classes.link}>
                <Card className={classes.card} raised={false}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={`${process.env.STORAGE_PATH}${encodeURIComponent(
                        edition.logo
                      )}?alt=media`}
                    />
                    <CardContent className={classes.content}>
                      <Typography variant="h6" component="span">
                        {edition.eventTitle} {edition.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {(edition.durationMinutes / 60).toFixed(0)} hours of
                        content
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {editionDateStart(edition)} |{" "}
                        {edition.state || edition.city}, {edition.country}
                      </Typography>
                      <div>
                        {edition.topTags.map((tag, index) => (
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
    </Container>
  );
};

export default EditionGrid;
