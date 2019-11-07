import Layout from "../components/Layout";
import EventEditions from "../components/EventEditions";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Link,
  Chip,
  Container,
  Grid
} from "@material-ui/core";
import { OpenInNew as LinkIcon } from "@material-ui/icons";
import { Event } from "../schema";
import Database from "../services/Database";
import { NextPage, NextPageContext } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import CATEGORIES from "../constants/categories";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    container: {
      marginTop: theme.spacing(2)
    },
    description: {
      whiteSpace: "pre-line"
    },
    externalLinkIcon: {
      fontSize: theme.typography.fontSize
    },
    logo: {
      maxWidth: "50%",
      height: theme.typography.fontSize * 4
    }
  })
);

interface Props {
  event: Event;
}

const EventDetails: NextPage<Props> = ({ event }) => {
  const classes = useStyles({});
  const shortDate = (date: string) => {
    const startDate = new Date(date);
    var options = {
      month: "short",
      day: "numeric"
    };

    return startDate.toLocaleDateString(undefined, options);
  };

  const breadcrumbs = [
    {
      title: event.title
    }
  ];

  return (
    <Layout
      title={`${event.title}`}
      description={event.description}
      keywords={`react event,react conference,developer conference`}
    >
      <Breadcrumbs items={breadcrumbs} />
      <Container className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <img
                  className={classes.logo}
                  src={`${process.env.STORAGE_PATH}${encodeURIComponent(
                    event.logo
                  )}?alt=media`}
                  alt="Event logo"
                />
                <Typography variant="h1" paragraph>
                  {event.title}
                </Typography>
                {event.categories.map(cat => (
                  <Chip
                    color="default"
                    variant="default"
                    key={cat}
                    label={
                      CATEGORIES.find(category => category.id === cat).title
                    }
                    className={classes.chip}
                  />
                ))}
                <Typography variant="body1" className={classes.description}>
                  {event.description}
                </Typography>
                <p>
                  <Link href={event.website} target="_blank" variant="body2">
                    Official website{" "}
                    <LinkIcon className={classes.externalLinkIcon} />
                  </Link>
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <EventEditions event={event} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

interface QueryProps {
  eventid: string;
}
EventDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { eventid } = (ctx.query as unknown) as QueryProps;
  const event = await Database.getEvent(eventid);
  return { event };
};

export default EventDetails;
