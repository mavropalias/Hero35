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
  Button,
  Hidden
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Payment as TicketIcon } from "@material-ui/icons";
import { default as NextLink } from "next/link";
import { EventEdition } from "../schema";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";
import EditionList from "./EditionList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { height: "100%" },
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
  const { state: stateStack } = useContext(StackContext);
  const theme = useTheme();
  const editionCount = useMediaQuery(theme.breakpoints.down("sm")) ? 4 : 3;
  const classes = useStyles({});

  const editionDateStart = (edition: EventEdition) => {
    const startDate = new Date(edition.startDate);
    var options = {
      month: "short",
      day: "numeric"
    };

    return startDate.toLocaleDateString(undefined, options);
  };

  const UpcomingEditionGrid = () => (
    <Grid container spacing={4}>
      {editions.slice(0, editionCount).map(edition => (
        <Grid
          key={`${edition.eventId}${edition.id}`}
          item
          xs={12}
          sm={6}
          md={4}
        >
          <Card className={classes.card} raised={false}>
            <NextLink
              href={`/[eventid]/[editionid]`}
              as={`/${edition.eventId}/${edition.id}`}
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
                    <Typography variant="subtitle1" color="primary">
                      {edition.eventTitle} {edition.title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {editionDateStart(edition)},{" "}
                      {edition.state || edition.city}, {edition.country}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </a>
            </NextLink>
            <CardContent className={classes.content}>
              <Typography>
                <Button
                  variant="contained"
                  href={edition.ticketsUrl}
                  target="_blank"
                  title={`Tickets are sold by the ${edition.eventTitle} organisers. Not affiliated with Hero35.`}
                  rel="noopener"
                >
                  <Hidden smDown>Buy tickets</Hidden>
                  <Hidden mdUp>Tickets</Hidden>
                  <TicketIcon className={classes.icon} />
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <section className={className}>
      <Typography variant="h2">
        Upcoming {stateStack.contextTitle} conferences
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        See what's coming next.
      </Typography>
      <Hidden mdUp>
        <EditionList editions={editions} />
      </Hidden>
      <Hidden smDown>
        <UpcomingEditionGrid />
      </Hidden>
    </section>
  );
};

export default UpcomingEditions;
