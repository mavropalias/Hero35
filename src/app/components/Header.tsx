import {
  AppBar,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Box,
  Button,
  IconButton,
  Avatar,
  Hidden,
  Drawer,
  List,
  ListItem,
  Link
} from "@material-ui/core";
import ROUTES from "../constants/routes";
import SearchInput from "./SearchInput";
import { Menu as MenuIcon, Twitter as TwitterIcon } from "@material-ui/icons/";
import { default as NextLink } from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "./UserContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alphaIcon: {
      marginLeft: theme.spacing(1)
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    logo: {
      maxHeight: "30px"
    },
    menuLink: {
      whiteSpace: "nowrap"
    },
    search: {
      maxWidth: "350px",
      margin: "0"
    }
  })
);

const Navigation = () => {
  const { state, dispatch } = useContext(UserContext);
  const [drawer, setDrawer] = useState();
  const classes = useStyles({});

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  return (
    <AppBar
      className={classes.appBar}
      position="sticky"
      color="inherit"
      elevation={0}
    >
      <Container>
        <Hidden implementation="css" xsDown>
          <Toolbar disableGutters={true}>
            <Box marginRight={1}>
              <MenuLink href={ROUTES.HOME}>Home</MenuLink>
            </Box>
            <Box marginRight={1}>
              <MenuLink href={ROUTES.CURATED}>Curated talks</MenuLink>
            </Box>
            <Box flexGrow="1" m={1}>
              <SearchInput className={classes.search} />
            </Box>
            <Box marginRight={1}>
              <MenuLink href={ROUTES.ACCOUNT}>
                {state.signedIn ? (
                  <Avatar alt={state.name} src={state.picture} />
                ) : (
                  "Sign in"
                )}
              </MenuLink>
            </Box>
            <MenuLink href={ROUTES.HOME}>
              <img src="/static/HERO35-logo.svg" className={classes.logo} />
            </MenuLink>
          </Toolbar>
        </Hidden>
        <Hidden implementation="css" smUp>
          <Toolbar disableGutters={true}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Box flexGrow="1" marginRight={2}>
              <SearchInput className={classes.search} />
            </Box>
            <MenuLink href={ROUTES.HOME}>
              <img src="/static/HERO35-logo.svg" className={classes.logo} />
            </MenuLink>
          </Toolbar>
          <Drawer open={drawer} onClose={toggleDrawer(false)}>
            <List>
              <ListItem>
                <MenuLink href={ROUTES.HOME}>Home</MenuLink>
              </ListItem>
              <ListItem>
                <MenuLink href={ROUTES.CURATED}>Curated talks</MenuLink>
              </ListItem>
              <ListItem divider>
                <MenuLink href={ROUTES.ACCOUNT}>
                  {state.signedIn ? (
                    <Avatar alt={state.name} src={state.picture} />
                  ) : (
                    "Sign in"
                  )}
                </MenuLink>
              </ListItem>
              <ListItem>
                <NextLink href={ROUTES.TWITTER} as={ROUTES.TWITTER} passHref>
                  <Button
                    component="a"
                    target="_blank"
                    startIcon={<TwitterIcon />}
                    className={classes.menuLink}
                  >
                    @Hero35Official
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </Drawer>
        </Hidden>
      </Container>
    </AppBar>
  );
};

const MenuLink = ({ href, children }) => {
  const classes = useStyles({});

  return (
    <NextLink href={href} as={href} passHref>
      <Button className={classes.menuLink}>{children}</Button>
    </NextLink>
  );
};

export default Navigation;
