import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { TalkBasic } from "../schema";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react-lite";

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
      backgroundPosition: "center",
      transition: theme.transitions.create("opacity"),
      opacity: 0.5
    },
    coverImageInnerActive: {
      opacity: 1
    },
    shadowLR: {
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      maxWidth: "80rem",
      height: "100%",
      zIndex: 2,
      opacity: 1,
      transition: theme.transitions.create("opacity", { duration: 1200 }),
      background:
        "linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0.9) 50%, rgba(18,18,18,0.75) 70%, rgba(18,18,18,0) 100%)"
    },
    shadowLRActive: {
      opacity: 0.9
    },
    shadowBT: {
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: theme.spacing(24),
      zIndex: 2,
      background:
        "linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0.70) 50%, rgba(18,18,18,0) 100%)"
    }
  })
);

interface Props {
  talk: TalkBasic;
}

const HubCoverImage = observer(({ talk }: Props) => {
  const classes = useStyles({});
  const { userStore } = useStores();

  const innerClasses = () => {
    if (userStore.isAboutToPlayTalk) {
      return `${classes.coverImageInner} ${classes.coverImageInnerActive}`;
    }
    return classes.coverImageInner;
  };

  const shadowLRClasses = () => {
    if (userStore.isAboutToPlayTalk) {
      return `${classes.shadowLR} ${classes.shadowLRActive}`;
    }
    return classes.shadowLR;
  };

  return (
    <div className={classes.coverImage}>
      <div
        className={innerClasses()}
        style={{
          backgroundImage: `url(https://i.ytimg.com/vi/${
            talk.youtubeId
          }/maxres${talk.coverImage || "2"}.jpg)`
        }}
      ></div>
      <span className={shadowLRClasses()}></span>
      <span className={classes.shadowBT}></span>
    </div>
  );
});

export default HubCoverImage;
