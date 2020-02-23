import { Grid, Button, ButtonGroup } from "@material-ui/core";
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkOutlinedIcon,
  ThumbUp as VotedUp,
  ThumbUpOutlined as VoteUp,
  ThumbDown as VotedDown,
  ThumbDownOutlined as VoteDown
} from "@material-ui/icons";
import { TalkPreview, TalkBasic } from "../schema";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/useStores";
import TalkShareButton from "./TalkShareButton";

const TalkControls = observer(
  ({
    talk,
    size = "large"
  }: {
    talk: TalkPreview | TalkBasic;
    size?: "small" | "medium" | "large";
  }) => {
    const { userStore } = useStores();
    return (
      <>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonGroup size={size} color="secondary">
              <Button
                variant={
                  userStore.isTalkLiked(talk.id) ? "contained" : "outlined"
                }
                startIcon={
                  userStore.isTalkLiked(talk.id) ? <VotedUp /> : <VoteUp />
                }
                onClick={_ => userStore.likeTalk(talk.id)}
              >
                {userStore.isTalkLiked(talk.id) ? "Liked" : "Like"}
              </Button>
              <Button
                variant={
                  userStore.isTalkDisliked(talk.id) ? "contained" : "outlined"
                }
                onClick={_ => userStore.dislikeTalk(talk.id)}
              >
                {userStore.isTalkDisliked(talk.id) ? (
                  <VotedDown
                    fontSize={size === "small" ? "small" : "default"}
                  />
                ) : (
                  <VoteDown fontSize={size === "small" ? "small" : "default"} />
                )}
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            {userStore.isTalkSaved(talk.id) ? (
              <Button
                title="Remove this saved talk"
                size={size}
                onClick={_ => userStore.unsaveTalk(talk)}
                startIcon={<BookmarkIcon color="secondary" />}
              >
                Saved
              </Button>
            ) : (
              <Button
                title="Save this talk in My Saved Talks"
                size={size}
                onClick={_ => userStore.saveTalk(talk)}
                startIcon={<BookmarkOutlinedIcon color="secondary" />}
              >
                Save
              </Button>
            )}
          </Grid>
          <Grid item>
            <TalkShareButton talk={talk} size={size} />
          </Grid>
        </Grid>
      </>
    );
  }
);

export default TalkControls;
