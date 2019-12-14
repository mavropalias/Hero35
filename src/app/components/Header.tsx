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
  Drawer
} from "@material-ui/core";
import ROUTES from "../constants/routes";
import SearchInput from "./SearchInput";
import {
  Menu as MenuIcon,
  AccountCircle as AccountIcon
} from "@material-ui/icons/";
import { useContext, useState } from "react";
import { UserContext } from "./context-providers/UserContextProvider";
import { StackContext } from "./context-providers/StackContextProvider";
import HubNavigation from "./HubNavigation";
import LinkPrefetch from "./LinkPrefetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    account: {
      width: "250px",
      marginLeft: theme.spacing(8),
      textAlign: "right"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawerNavigation: {
      maxWidth: "300px",
      padding: theme.spacing(1)
    },
    home: { width: "250px", marginRight: theme.spacing(8) },
    logo: {
      maxHeight: "30px"
    },
    search: {
      width: "100%",
      margin: theme.spacing(0, 1),
      [theme.breakpoints.up("md")]: {
        width: "550px"
      }
    },
    toolbar: {
      justifyContent: "space-between"
    }
  })
);

const Navigation = () => {
  const { state: stateUser } = useContext(UserContext);
  const { state: stateStack, dispatch: dispatchStack } = useContext(
    StackContext
  );
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

  const MiniNav = () => (
    <>
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
        <MenuLink
          href={stateStack.slug ? `/stack/[stackid]` : ROUTES.HOME}
          as={stateStack.slug ? `/stack/${stateStack.slug}` : ROUTES.HOME}
        >
          <img src="/HERO35-logo.svg" className={classes.logo} />
        </MenuLink>
      </Toolbar>
      <Drawer open={drawer} onClose={toggleDrawer(false)}>
        <HubNavigation className={classes.drawerNavigation} />
      </Drawer>
    </>
  );

  return (
    <AppBar
      className={classes.appBar}
      position="sticky"
      color="inherit"
      elevation={0}
    >
      <Container maxWidth="xl">
        <Hidden implementation="css" smDown>
          <Toolbar
            className={classes.toolbar}
            disableGutters={true}
            variant="dense"
          >
            <LinkPrefetch
              href={stateStack.slug ? `/stack/[stackid]` : ROUTES.HOME}
              as={stateStack.slug ? `/stack/${stateStack.slug}` : ROUTES.HOME}
            >
              <a className={classes.home}>
                <img src="/HERO35-logo.svg" className={classes.logo} />
              </a>
            </LinkPrefetch>
            <SearchInput className={classes.search} />
            <span className={classes.account}>
              <LinkPrefetch href={ROUTES.ACCOUNT} as={ROUTES.ACCOUNT} passHref>
                {stateUser.signedIn ? (
                  <a>
                    {stateUser.picture ? (
                      <Avatar
                        alt={stateUser.name}
                        src={stateUser.picture}
                        style={{ float: "right" }}
                      />
                    ) : (
                      <AccountIcon color="action" fontSize="large" />
                    )}
                  </a>
                ) : (
                  <Button variant="contained" color="primary">
                    Sign in
                  </Button>
                )}
              </LinkPrefetch>
            </span>
          </Toolbar>
        </Hidden>
        <Hidden implementation="css" mdUp>
          <MiniNav />
        </Hidden>
      </Container>
    </AppBar>
  );
};

const MenuLink = ({
  href,
  as,
  children,
  className
}: {
  href: string;
  as?: string;
  children: any;
  className?: string;
}) => {
  const classes = useStyles({});

  return (
    <LinkPrefetch href={href} as={as || href} passHref>
      <Button className={className}>{children}</Button>
    </LinkPrefetch>
  );
};

export default Navigation;
