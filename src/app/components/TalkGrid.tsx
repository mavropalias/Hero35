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
    card: { height: "100%", background: "black" },
    cardActionArea: {},
    eventLogo: {
      maxHeight: "1em",
      verticalAlign: "middle"
    },
    link: {
      textDecoration: "none",
      color: "inherit"
    },
    media: {
      paddingBottom: "56.25%" /* maintain 16:9 aspect ratio */,
      height: 0
    }
  })
);

interface Props {
  talks?: Talk[];
  className?: string;
}

const Talks: NextPage<Props> = ({ talks, className }) => {
  const classes = useStyles({});

  return (
    <Container className={className}>
      <Typography variant="h5" component="h2" color="textSecondary" paragraph>
        Recent talks
      </Typography>
      <Grid container spacing={4}>
        {talks.map(talk => (
          <Grid key={talk.id} item xs={12} sm={6} md={4}>
            <Card className={classes.card} elevation={5}>
              <NextLink
                href={`/event/[eventid]/[editionid]/[talkslug]`}
                as={`/event/${talk.eventId}/${talk.editionId}/${talk.slug}`}
              >
                <a className={classes.link}>
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
