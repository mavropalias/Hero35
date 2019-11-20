import {
  createStyles,
  makeStyles,
  Theme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  ListSubheader,
  Divider,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import ROUTES from "../constants/routes";
import { Bookmarks as BookmarksIcon } from "@material-ui/icons";
import { default as NextLink } from "next/link";
import { useContext } from "react";
import { UserContext } from "./context-providers/UserContextProvider";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth
    },
    iconRoot: {
      textAlign: "center"
    },
    imageIcon: {
      display: "block",
      height: "100%"
    },
    toolbar: theme.mixins.toolbar
  })
);

const AppDrawer = () => {
  const classes = useStyles({});
  const { state, dispatch } = useContext(UserContext);

  const UserShortcuts = () => (
    <List>
      <NextLink href={ROUTES.HOME} as={ROUTES.HOME} passHref>
        <ListItem component="a" button>
          <ListItemIcon>
            <BookmarksIcon />
          </ListItemIcon>
          <ListItemText primary="Saved talks" />
        </ListItem>
      </NextLink>
    </List>
  );

  const PreviewCategory = ({ label, slug }) => (
    <ListItem disabled title="Coming soon">
      <ListItemIcon>
        <Icon classes={{ root: classes.iconRoot }}>
          <img className={classes.imageIcon} src={`/stacks/${slug}.svg`} />
        </Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );

  const Categories = () => (
    <List subheader={<ListSubheader>Categories:</ListSubheader>}>
      <PreviewCategory label="Angular" slug="angular" />
      <PreviewCategory label="CSS" slug="css" />
      <PreviewCategory label="General" slug="terminal" />
      <PreviewCategory label="JavaScript" slug="javascript" />
      <NextLink href={ROUTES.HOME} as={ROUTES.HOME} passHref>
        <ListItem selected={true} component="a" button>
          <ListItemIcon>
            <Icon classes={{ root: classes.iconRoot }}>
              <img className={classes.imageIcon} src="/stacks/react.svg" />
            </Icon>
          </ListItemIcon>
          <ListItemText primary="React" />
        </ListItem>
      </NextLink>
    </List>
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawer
      }}
    >
      <div className={classes.toolbar} />
      <UserShortcuts />
      <Divider />
      <Categories />
    </Drawer>
  );
};
export default AppDrawer;
