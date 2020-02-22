import {
  Box,
  Container,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Button
} from "@material-ui/core";
import {
  Bookmarks as BookmarksIcon,
  BookmarkBorder as BookmarkOutlinedIcon
} from "@material-ui/icons";
import TalkGrid from "../TalkGrid";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/useStores";

const SavedTalks = observer(() => {
  const { userStore } = useStores();
  return (
    <>
      <Box display="flex" alignItems="center" marginBottom={4}>
        <Typography variant="h3" component="h1">
          <BookmarksIcon fontSize="large" />
          &nbsp; Saved talks
        </Typography>
      </Box>
      <Box marginBottom={20}>
        {userStore.savedTalks.length > 0 ? (
          <TalkGrid talks={userStore.savedTalks}></TalkGrid>
        ) : (
          <>
            <Typography variant="subtitle1" paragraph>
              You can save talks to watch later.
            </Typography>
            <Typography paragraph>
              Look for this button, across the site:&nbsp;&nbsp;
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                title="Save this talk in My Saved Talks"
                startIcon={<BookmarkOutlinedIcon />}
              >
                Save
              </Button>
            </Typography>
            <Typography variant="subtitle1">
              Your saved talks will appear on this page.
            </Typography>
          </>
        )}
      </Box>
    </>
  );
});

export default SavedTalks;
