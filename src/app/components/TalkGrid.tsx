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
  Typography
} from "@material-ui/core";
import { default as NextLink } from "next/link";
import { NextPage } from "next";
import { Talk } from "../schema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { height: "100%" },
    cardActionArea: {},
    eventLogo: {
      maxHeight: "1em",
      verticalAlign: "middle"
    },
    media: { height: 150 }
  })
);

interface Props {
  talks?: Talk[];
}

const Talks: NextPage<Props> = ({ talks }) => {
  const classes = useStyles({});

  return (
    <Container>
      <Typography variant="h6" component="h2" gutterBottom>
        Recent talks:
      </Typography>
      <Grid container spacing={4}>
        {talks.map(talk => (
          <Grid key={talk.id} item xs={12} sm={6} md={4}>
            <Card className={classes.card} elevation={5}>
              <CardHeader
                title={
                  <NextLink
                    href={`/event/[eventid]/[editionid]`}
                    as={`/event/${talk.eventId}/${talk.editionId}`}
                    passHref
                  >
                    <Link variant="body1">
                      {talk.eventTitle} {talk.editionTitle}
                    </Link>
                  </NextLink>
                }
                avatar={
                  <img
                    className={classes.eventLogo}
                    src={`${process.env.STORAGE_PATH}${encodeURIComponent(
                      talk.logo
                    )}?alt=media`}
                    alt={`${talk.eventTitle} ${talk.editionTitle} logo`}
                  />
                }
              />
              <NextLink
                href={`/event/[eventid]/[editionid]/[talkid]`}
                as={`/event/${talk.eventId}/${talk.editionId}/${talk.id}`}
              >
                <a>
                  <CardActionArea className={classes.cardActionArea}>
                    <CardMedia
                      className={classes.media}
                      image={`https://i.ytimg.com/vi/${talk.id}/sddefault.jpg`}
                    />
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        {talk.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {talk.speaker},{" "}
                        {talk.times && (
                          <>
                            {talk.times.h > 0 && <>{talk.times.h}h </>}
                            {talk.times.m} minutes
                          </>
                        )}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </a>
              </NextLink>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Talks;
