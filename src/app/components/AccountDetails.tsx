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
    return state.savedTalks.sort((a, b) => (a.date < b.date ? 1 : 0));
  };

  return (
    <Container>
      <Avatar alt={state.name} src={state.picture} className={classes.avatar} />
      <Typography color="textSecondary" paragraph>
        {state.name || state.email}
      </Typography>
      <Box display="flex" alignItems="center" marginBottom={1}>
        <BookmarksIcon fontSize="small" />
        &nbsp;
        <Typography variant="h5" component="h2">
          Saved talks:
        </Typography>
      </Box>
      <TalkGrid
        talks={savedTalks()}
        showVotes={false}
        showSaveButton={false}
      ></TalkGrid>
      <Box marginTop={3}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => Database.auth.signOut()}
        >
          Sign out
        </Button>
      </Box>
    </Container>
  );
};

export default AccountDetails;
