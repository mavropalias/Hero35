import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { TalkBasic } from "../../schema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coverImage: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
      width: "100%"
    },
    coverImageInner: {
      height: "100vh",
      maxHeight: `calc(95vh - 48px)`,
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    shadowLR: {
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      maxWidth: "72rem",
      height: "100%",
      zIndex: 2,
      background:
        "linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0.75) 70%, rgba(18,18,18,0) 100%)"
    },
    shadowBT: {
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: theme.spacing(8),
      zIndex: 2,
      background:
        "linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0) 100%)"
    }
  })
);

interface Props {
  talk: TalkBasic;
}

const HubCoverImage = ({ talk }: Props) => {
  const classes = useStyles({});

  return (
    <div className={classes.coverImage}>
      <div
        className={classes.coverImageInner}
        style={{
          backgroundImage: `url(https://i.ytimg.com/vi/${
            talk.youtubeId
          }/maxres${talk.coverImage || "2"}.jpg)`
        }}
      ></div>
      <span className={classes.shadowLR}></span>
      <span className={classes.shadowBT}></span>
    </div>
  );
};

export default HubCoverImage;
