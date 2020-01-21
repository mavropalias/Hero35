import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Hidden,
  Drawer,
  Divider,
  useMediaQuery,
  useTheme,
  Button
} from "@material-ui/core";
import ROUTES from "../constants/routes";
import SearchInput from "./SearchInput";
import {
  Menu as MenuIcon,
  AccountCircle as AccountIcon
} from "@material-ui/icons/";
import { useState } from "react";
import HubNavigation from "./HubNavigation";
import LinkPrefetch from "./LinkPrefetch";
import STACKS from "../constants/stacks";
import StacksMenu from "./StacksMenu";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(0, 4, 0, 2)
    },
    drawerNavigation: {
      maxWidth: "300px",
      padding: theme.spacing(1)
    },
    headerDivider: {
      height: "60px",
      margin: theme.spacing(0, 2)
    },
    headerLink: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      fontSize: theme.typography.fontSize * 1.45,
      height: theme.spacing(8),
      color: "white",
      textDecoration: "none",
      textTransform: "none",
      whiteSpace: "nowrap",
      fontWeight: "bold",
      "&:hover": {
        borderColor: theme.palette.divider
      },
      [theme.breakpoints.up("sm")]: {
        paddingRight: theme.spacing(1),
        padding: theme.spacing(0, 1),
        borderBottom: "4px solid transparent"
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: theme.typography.fontSize * 1.45,
        paddingRight: theme.spacing(1.5),
        padding: theme.spacing(0, 1.5)
      },
      [theme.breakpoints.up("xl")]: {
        paddingRight: theme.spacing(2),
        padding: theme.spacing(0, 2)
      }
    },
    headerLinkActive: {
      borderColor: "white"
    },
    headerLinkIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      [theme.breakpoints.up("lg")]: {
        marginRight: theme.spacing(1)
      }
    },
    headerLinkStackLabel: {
      [theme.breakpoints.down("md")]: {
        display: "none"
      }
    },
    logo: {
      maxHeight: "20px"
    },
    search: {
      width: "100%",
      margin: 0,
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 0, 0, 2),
        width: "250px"
      }
    },
    toolbar: {
      justifyContent: "space-between",
      alignItems: "center"
    },
    userPicture: {
      marginLeft: theme.spacing(2)
    }
  })
);

const Header = observer(() => {
  const { userStore } = useStores();
  const [drawer, setDrawer] = useState();
  const classes = useStyles({});
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

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
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        {!xs && (
          <>
            <Divider orientation="vertical" className={classes.headerDivider} />
            <FeaturedStacks />
            <Divider orientation="vertical" className={classes.headerDivider} />
          </>
        )}
        <Box flexGrow="1" paddingRight={2}>
          <SearchInput className={classes.search} />
        </Box>
        <LinkPrefetch href={ROUTES.HOME} as={ROUTES.HOME}>
          <a className={`${classes.headerLink}`}>
            <img src="/HERO35-logo.svg" className={classes.logo} />
          </a>
        </LinkPrefetch>
      </Toolbar>
      <Drawer
        open={drawer}
        onClose={toggleDrawer(false)}
        onClick={toggleDrawer(false)}
      >
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
      <Hidden implementation="css" smDown>
        <Toolbar className={classes.toolbar} disableGutters={true}>
          <LinkPrefetch href={ROUTES.HOME} as={ROUTES.HOME}>
            <a className={`${classes.headerLink}`}>
              <img src="/HERO35-logo.svg" className={classes.logo} />
            </a>
          </LinkPrefetch>
          {userStore.isSignedIn ? (
            <LinkPrefetch
              href={ROUTES.SAVED_TALKS}
              as={ROUTES.SAVED_TALKS}
              passHref
            >
              <a className={classes.headerLink}>My saved talks</a>
            </LinkPrefetch>
          ) : (
            <Button
              onClick={_ => userStore.setShouldSignIn(true)}
              className={classes.headerLink}
            >
              Sign up / in
            </Button>
          )}
          <LinkPrefetch href="/year/[yearid]" as="/year/2020">
            <a
              className={`${classes.headerLink} ${false &&
                classes.headerLinkActive}`}
            >
              Conferences
            </a>
          </LinkPrefetch>
          <Divider orientation="vertical" className={classes.headerDivider} />
          <FeaturedStacks />
          <StacksMenu />
          <Divider orientation="vertical" className={classes.headerDivider} />
          <SearchInput className={classes.search} />
          {userStore.isSignedIn && (
            <LinkPrefetch href={ROUTES.ACCOUNT} as={ROUTES.ACCOUNT} passHref>
              <a className={classes.userPicture}>
                {userStore.picture ? (
                  <Avatar alt={userStore.name} src={userStore.picture} />
                ) : (
                  <AccountIcon
                    color="action"
                    fontSize="large"
                    style={{ display: "block" }}
                  />
                )}
              </a>
            </LinkPrefetch>
          )}
        </Toolbar>
      </Hidden>
      <Hidden implementation="css" mdUp>
        <MiniNav />
      </Hidden>
    </AppBar>
  );
});

const FeaturedStacks = () => {
  const classes = useStyles({});
  const theme = useTheme();
  const visibleStacks = useMediaQuery(theme.breakpoints.up("xl")) ? 4 : 3;

  return (
    <>
      {STACKS.filter(stack => stack.isPrime === true)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .slice(0, visibleStacks)
        .map(stack => (
          <LinkPrefetch
            href="/topic/[topicid]"
            as={`/topic/${stack.slug}`}
            key={stack.slug}
          >
            <a
              title={stack.label}
              className={classes.headerLink}
              style={{
                color: stack.color
              }}
            >
              <img
                src={`/stacks/${stack.slug}.svg`}
                className={classes.headerLinkIcon}
                alt=""
              />
              <span className={classes.headerLinkStackLabel}>
                {stack.label}
              </span>
            </a>
          </LinkPrefetch>
        ))}
    </>
  );
};

export default Header;
