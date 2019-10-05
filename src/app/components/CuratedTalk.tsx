import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import { default as NextLink } from "next/link";
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
    link: {
      display: "block",
      height: "100%",
      textDecoration: "none",
      color: "inherit"
    }
  })
);

const CuratedTalk = ({ talk }: { talk: Talk }) => {
  const classes = useStyles({});

  return (
    <Card className={classes.card} elevation={5}>
      <NextLink
        href={`/[eventid]/[editionid]/[talkslug]`}
        as={`/${talk.eventId}/${talk.editionId}/${talk.slug}`}
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
  );
};

export default CuratedTalk;
