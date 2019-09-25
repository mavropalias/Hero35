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
  Typography
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { default as NextLink } from "next/link";
import { NextPage } from "next";
import { Talk } from "../schema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { height: "100%", background: "black" },
    cardActionArea: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start"
    },
    cardContent: {
      padding: theme.spacing(0, 2, 2, 2),
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    cardMedia: {
      paddingBottom: "56.25%" /* maintain 16:9 aspect ratio */,
      position: "relative",
      height: 0
    },
    cardMediaShadow: {
      height: "100%",
      width: "100%",
      position: "absolute",
      background:
        "linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: theme.spacing(2, 2, 0, 2)
    },
    chip: {
      margin: theme.spacing(1, 1, 0, 0)
    },
    eventLogo: {
      maxHeight: "1em",
      verticalAlign: "middle"
    },
    link: {
      display: "block",
      height: "100%",
      textDecoration: "none",
      color: "inherit"
    }
  })
);

interface Props {
  talks?: Talk[];
  className?: string;
}

const CuratedTalks: NextPage<Props> = ({ talks, className }) => {
  const theme = useTheme();
  const talkCount = useMediaQuery(theme.breakpoints.only("sm")) ? 4 : 3;
  const classes = useStyles({});

  return (
    <Container className={className}>
      <Typography variant="h5" component="h2">
        Curated talks
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        Must-watch talks, hand-picked by our editorial team.
      </Typography>
      <Grid container spacing={2}>
        {talks.slice(0, talkCount).map(talk => (
          <Grid key={talk.id} item xs={12} sm={6} md={4}>
            <Card className={classes.card} elevation={5}>
              <NextLink
                href={`/event/[eventid]/[editionid]/[talkid]`}
                as={`/event/${talk.eventId}/${talk.editionId}/${talk.id}`}
              >
                <a className={classes.link}>
                  <CardActionArea className={classes.cardActionArea}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={`https://i.ytimg.com/vi/${talk.id}/sddefault.jpg`}
                    >
                      <div className={classes.cardMediaShadow}>
                        <Typography variant="overline" color="textSecondary">
                          {talk.eventTitle} {talk.editionTitle}
                        </Typography>
                      </div>
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h5" component="h2">
                        {talk.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {talk.curationDescription}
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

export default CuratedTalks;
