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
import { Menu as MenuIcon } from "@material-ui/icons/";
import { default as NextLink } from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "./context-providers/UserContextProvider";
import { StackContext } from "./context-providers/StackContextProvider";
import HubNavigation from "./HubNavigation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    account: {
      width: "300px",
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
          <img src="/static/HERO35-logo.svg" className={classes.logo} />
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
            <NextLink
              href={stateStack.slug ? `/stack/[stackid]` : ROUTES.HOME}
              as={stateStack.slug ? `/stack/${stateStack.slug}` : ROUTES.HOME}
            >
              <a className={classes.home}>
                <img src="/static/HERO35-logo.svg" className={classes.logo} />
              </a>
            </NextLink>
            <SearchInput className={classes.search} />
            <span className={classes.account}>
              <NextLink href={ROUTES.ACCOUNT} as={ROUTES.ACCOUNT} passHref>
                {stateUser.signedIn ? (
                  <a>
                    <Avatar
                      alt={stateUser.name}
                      src={stateUser.picture}
                      style={{ float: "right" }}
                    />
                  </a>
                ) : (
                  <Button variant="contained" color="primary">
                    Sign in
                  </Button>
                )}
              </NextLink>
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
    <NextLink href={href} as={as || href} passHref>
      <Button className={className}>{children}</Button>
    </NextLink>
  );
};

export default Navigation;
