import { UserContext, UserContextProps } from "./UserContextProvider";
import Database from "../services/Database";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Container,
  Button,
  Avatar,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  Bookmarks as BookmarksIcon,
  Event as EventIcon,
  Label as TopicsIcon
} from "@material-ui/icons";
import { useContext } from "react";

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

  return (
    <Container>
      <Avatar alt={state.name} src={state.picture} className={classes.avatar} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {state.name}
          </ListSubheader>
        }
      >
        <ListItem button>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary="Watch list" secondary="Coming soon..." />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Saved Events" secondary="Coming soon..." />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TopicsIcon />
          </ListItemIcon>
          <ListItemText primary="Favourite topics" secondary="Coming soon..." />
        </ListItem>
      </List>
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
