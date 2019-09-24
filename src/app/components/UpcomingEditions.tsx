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
  Button
} from "@material-ui/core";
import { Payment as TicketIcon } from "@material-ui/icons";
import { default as NextLink } from "next/link";
import { EventEdition } from "../schema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { height: "100%", background: "transparent" },
    content: { textAlign: "center" },
    link: { textDecoration: "none", color: "inherit" },
    media: {
      height: 48,
      backgroundSize: "contain",
      margin: theme.spacing(2, 1, 0, 1)
    },
    icon: {
      marginLeft: theme.spacing(1)
    }
  })
);

interface Props {
  editions?: EventEdition[];
  className?: string;
}

const UpcomingEditions = ({ editions, className }: Props) => {
  const classes = useStyles({});

  const editionDays = (edition: EventEdition) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(edition.startDate);
    const secondDate = new Date(edition.endDate);

    return (
      Math.round(
        Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
      ) + 1
    );
  };

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
            <Card className={classes.card} raised={false}>
              <NextLink
                href={`/event/[eventid]/[editionid]`}
                as={`/event/${edition.eventId}/${edition.id}`}
              >
                <a className={classes.link}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={`${process.env.STORAGE_PATH}${encodeURIComponent(
                        edition.logo
                      )}?alt=media`}
                    />
                    <CardContent className={classes.content}>
                      <Typography variant="h6">
                        {edition.eventTitle} {edition.title}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {editionDateStart(edition)} | {editionDays(edition)}{" "}
                        days |&nbsp;
                        {edition.state || edition.city}, {edition.country}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </a>
              </NextLink>
              <CardContent className={classes.content}>
                <Button
                  variant="contained"
                  color="secondary"
                  href={edition.ticketsUrl}
                >
                  Get tickets
                  <TicketIcon className={classes.icon} />
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UpcomingEditions;
