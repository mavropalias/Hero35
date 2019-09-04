import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Theme,
  Typography,
  Chip
} from "@material-ui/core";
import { default as NextLink } from "next/link";
import { NextPage } from "next";
import { EventEdition } from "../schema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { height: "100%" },
    media: { height: 135, backgroundSize: "contain", margin: theme.spacing(1) },
    tag: { margin: theme.spacing(1, 1, 0, 0) }
  })
);

interface Props {
  editions?: EventEdition[];
  className?: string;
}

const Editions: NextPage<Props> = ({ editions, className }) => {
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
      <Typography variant="h6" component="h2" gutterBottom>
        Recent events:
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
            <NextLink href={`/event/${edition.eventId}/${edition.id}`}>
              <Card className={classes.card} raised={false}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`${process.env.STORAGE_PATH}${encodeURIComponent(
                      edition.logo
                    )}?alt=media`}
                  />
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {edition.eventTitle} {edition.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {(edition.durationMinutes / 60).toFixed(0)} hours of
                      videos
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {editionDateStart(edition)} at{" "}
                      {edition.state || edition.city}, {edition.country}
                    </Typography>
                    {/* {edition.categories.map(cat => (
                      <Chip
                        key={cat.id}
                        size="small"
                        variant="outlined"
                        label={`#${cat.title}`}
                        className={classes.tag}
                      />
                    ))} */}
                  </CardContent>
                </CardActionArea>
              </Card>
            </NextLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Editions;
