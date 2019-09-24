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

const UpcomingEditions = ({ editions, className }) => {
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
    <Container className={className}>
      <Typography variant="h5" component="h2">
        Upcoming events
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        Stay up to date with upcoming React events.
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
                        {editionDateStart(edition)} at{" "}
                        {edition.state || edition.city}, {edition.country}
                      </Typography>
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

export default UpcomingEditions;
