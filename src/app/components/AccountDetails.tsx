import { UserContext } from "./context-providers/UserContextProvider";
import Database from "../services/Database";
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
import TalkGrid from "./TalkGrid";
import { TalkPreview } from "../schema";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      width: 100,
      height: 100
    }
  })
);

const AccountDetails = () => {
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles({});

  const savedTalks = () => {
    return state.savedTalks.sort((a: TalkPreview, b: TalkPreview) =>
      a.date < b.date ? 1 : 0
    );
  };

  return (
    <Container>
      <Avatar alt={state.name} src={state.picture} className={classes.avatar} />
      <Typography color="textSecondary" paragraph>
        {state.name || state.email}
      </Typography>
      <Box display="flex" alignItems="center" marginBottom={2} paddingTop={3}>
        <BookmarksIcon />
        &nbsp;
        <Typography variant="h4" component="h2">
          Saved talks
        </Typography>
      </Box>
      <Box marginBottom={9}>
        {state.savedTalks.length > 0 ? (
          <TalkGrid
            talks={savedTalks()}
            showVotes={false}
            showSaveButton={false}
          ></TalkGrid>
        ) : (
          <Typography color="textSecondary">
            You haven't saved any talks, yet.
          </Typography>
        )}
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => Database.auth.signOut()}
      >
        Sign out
      </Button>
    </Container>
  );
};

export default AccountDetails;
