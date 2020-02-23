import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions
} from "@material-ui/core";
import { Share as ShareIcon } from "@material-ui/icons";
import { TalkPreview, TalkBasic } from "../schema";
import { useState } from "react";
import STACKS from "../constants/stacks";

const TalkShareButton = ({
  talk,
  size = "large"
}: {
  talk: TalkPreview | TalkBasic;
  size?: "small" | "medium" | "large";
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);

  const talkUrl = `https://hero35.com/${talk.eventId}/${talk.editionId}/${talk.slug}`;
  const hashTags = STACKS.filter(stack => talk.tags.includes(stack.slug))
    .map(stack => stack.slug)
    .join(",");
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
    talkUrl
  )}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    talk.title + ". " + talk.curationDescription
  )}&url=${encodeURI(
    talkUrl
  )}&hashtags=${hashTags}&via=Hero35Official&related=mavropalias`;

  const handleOpen = () => {
    setShowShareDialog(true);
  };
  const handleClose = () => {
    setShowShareDialog(false);
  };

  const Topics = () => {
    const talkPrimaryTopics: string[] = STACKS.filter(stack =>
      talk.tags.includes(stack.slug)
    ).map(stack => stack.slug);
    return (
      <>
        {talkPrimaryTopics.map(topic => (
          <>#{topic} </>
        ))}
      </>
    );
  };

  return (
    <>
      <Button
        title="Share this talk"
        size={size}
        onClick={handleOpen}
        startIcon={<ShareIcon color="secondary" />}
      >
        Share
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showShareDialog}
      >
        <DialogTitle id="customized-dialog-title">Share this talk</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            {talk.title}. {talk.curationDescription} <Topics /> {talkUrl}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            component="a"
            href={facebookUrl}
            target="_blank"
          >
            Share on Facebook
          </Button>
          <Button
            color="primary"
            variant="contained"
            component="a"
            href={twitterUrl}
            target="_blank"
          >
            Share on Twitter
          </Button>
          <Button autoFocus onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TalkShareButton;
