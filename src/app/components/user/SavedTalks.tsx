import Database from "../../services/Database";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Container,
  Button,
  Avatar,
  Typography
} from "@material-ui/core";
import { Bookmarks as BookmarksIcon } from "@material-ui/icons";
import { useContext } from "react";
import TalkGrid from "../TalkGrid";
import { TalkPreview } from "../../schema";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/useStores";

const SavedTalks = observer(() => {
  const { userStore } = useStores();
  return (
    <Container>
      <Box display="flex" alignItems="center" marginBottom={4} paddingTop={4}>
        <BookmarksIcon />
        &nbsp;
        <Typography variant="h4" component="h1">
          My Saved talks
        </Typography>
      </Box>
      <Box marginBottom={20}>
        {userStore.savedTalks.length > 0 ? (
          <TalkGrid talks={userStore.savedTalks}></TalkGrid>
        ) : (
          <Typography color="textSecondary">
            Come back here, after you've saved a talk to watch later!
          </Typography>
        )}
      </Box>
    </Container>
  );
});

export default SavedTalks;
