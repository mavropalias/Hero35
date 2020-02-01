import YouTube from "react-youtube";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { TalkBasic, EventEdition } from "../../schema";
import { useStores } from "../../stores/useStores";
import { observer } from "mobx-react-lite";
import { useState } from "react";

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
      maxWidth: "40rem",
      height: "100%",
      zIndex: 2,
      background:
        "linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0.9) 50%, rgba(18,18,18,0.75) 70%, rgba(18,18,18,0) 100%)"
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
    },
    youtubePlayer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }
  })
);

interface Props {
  edition: EventEdition;
}

const EditionCoverMedia = observer(({ edition }: Props) => {
  const classes = useStyles({});
  const { userStore } = useStores();
  const [error, setError] = useState(false);

  const onYoutubeError = event => {
    console.log("yt error");
    setError(true);
  };

  const highlightVideos = () => {
    // Find highlight videos (type '9'), starting with the shortest one
    // We need at least two items in the return array, so that YouTube can loop
    // through them.
    if (!edition.talks) return [];
    let highlightVideos = edition.talks
      .filter(talk => talk.type === "9")
      .sort((a, b) => (a.times.totalMins > b.times.totalMins ? 1 : -1))
      .map(talk => talk.youtubeId);
    if (highlightVideos.length === 0) {
      highlightVideos = [
        edition.talks[0].youtubeId,
        edition.talks[1].youtubeId
      ];
    } else if (highlightVideos.length === 1) {
      highlightVideos.push(highlightVideos[0]);
    }
    return highlightVideos;
  };

  const youtubeOptions = {
    height: "100%",
    width: "100%",
    playerVars: {
      modestbranding: true,
      playsinline: true,
      rel: 0,
      autoplay: 1,
      mute: 1,
      loop: 1,
      controls: 0,
      disablekb: 1,
      playlist: highlightVideos()
        .slice(1)
        .join(",")
    }
  };

  return (
    <div className={classes.coverImage}>
      <div className={classes.coverImageInner}>
        {edition.talks && !error && (
          <YouTube
            className={classes.youtubePlayer}
            videoId={highlightVideos()[0]}
            opts={youtubeOptions}
            onError={onYoutubeError}
          />
        )}
      </div>
      <span className={classes.shadowLR}></span>
      <span className={classes.shadowBT}></span>
    </div>
  );
});

export default EditionCoverMedia;
