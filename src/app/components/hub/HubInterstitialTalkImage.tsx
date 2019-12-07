import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { TalkBasic } from "../../schema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
      width: "100%",
      height: "100%",
      backgroundSize: "contain",
      backgroundPosition: "top right",
      backgroundRepeat: "no-repeat",
      [theme.breakpoints.up("sm")]: {
        backgroundSize: "100vw"
      },
      [theme.breakpoints.up("md")]: {
        backgroundSize: "75vw"
      },
      [theme.breakpoints.up("lg")]: {
        backgroundSize: "60vw"
      },
      [theme.breakpoints.up("xl")]: {
        backgroundSize: "50vw"
      }
    },
    shadowRL: {
      display: "block",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      right: "1px",
      zIndex: 2,
      background:
        "linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0.3) 100%)",
      [theme.breakpoints.up("md")]: {
        left: "25vw",
        background:
          "linear-gradient(90deg, rgba(18,18,18,1) 0%,rgba(18,18,18,0.7) 40%, rgba(18,18,18,0) 70%)"
      },
      [theme.breakpoints.up("lg")]: {
        left: "40vw",
        background:
          "linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0) 50%)"
      },
      [theme.breakpoints.up("xl")]: {
        left: "50vw",
        background:
          "linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0) 40%)"
      }
    }
  })
);

interface Props {
  talk: TalkBasic;
}

const HubInterstitialTalkImage = ({ talk }: Props) => {
  const classes = useStyles({});

  return (
    <div
      className={classes.imageContainer}
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi/${
          talk.youtubeId
        }/maxres${talk.coverImage || "2"}.jpg)`
      }}
    >
      <span className={classes.shadowRL}></span>
    </div>
  );
};

export default HubInterstitialTalkImage;
