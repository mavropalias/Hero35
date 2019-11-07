import { useTheme } from "@material-ui/core/styles";
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
  Menu,
  MenuItem,
  Icon,
  Divider,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import ROUTES from "../constants/routes";
import Router from "next/router";
import SearchInput from "./SearchInput";
import {
  Menu as MenuIcon,
  Twitter as TwitterIcon,
  KeyboardArrowDown as DropdownIcon
} from "@material-ui/icons/";
import { default as NextLink } from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "./context-providers/UserContextProvider";
import CATEGORIES from "../constants/categories";
import { StackContext } from "./context-providers/StackContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alphaIcon: {
      marginLeft: theme.spacing(1)
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    iconRoot: {},
    imageIcon: {
      display: "block",
      height: "100%",
      width: "100%"
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
  const { state: stateUser } = useContext(UserContext);
  const { state: stateStack, dispatch: dispatchStack } = useContext(
    StackContext
  );
  const [drawer, setDrawer] = useState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const theme = useTheme();
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

  const handleStackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLElement>,
    slug: string
  ) => {
    setAnchorEl(null);
    dispatchStack({ type: "ROUTE_TO_STACK", stack_slug: slug });
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <List>
          <NextLink
            href={stateStack.slug ? `/stack/[stackid]` : ROUTES.HOME}
            as={stateStack.slug ? `/stack/${stateStack.slug}` : ROUTES.HOME}
            passHref
          >
            <ListItem button component="a">
              <ListItemText primary="Home" />
            </ListItem>
          </NextLink>
          {stateStack.isCurated && (
            <NextLink
              href={`${ROUTES.CURATED}${
                stateStack.slug ? `?stack=${stateStack.slug}` : ""
              }`}
              passHref
            >
              <ListItem button component="a">
                <ListItemText primary="Curated talks" />
              </ListItem>
            </NextLink>
          )}
          <Divider />
          {CATEGORIES.map(cat => (
            <ListItem
              key={cat.id}
              button
              selected={cat.id === stateStack.id}
              onClick={event =>
                dispatchStack({ type: "ROUTE_TO_STACK", stack_slug: cat.slug })
              }
            >
              {cat.slug !== "" && (
                <ListItemIcon>
                  <Icon fontSize="large" classes={{ root: classes.iconRoot }}>
                    <img
                      className={classes.imageIcon}
                      src={`/static/stacks/${cat.slug}.svg`}
                    />
                  </Icon>
                </ListItemIcon>
              )}
              <ListItemText
                primary={`${cat.title}${cat.id !== "-1" ? " hub" : ""}`}
              />
            </ListItem>
          ))}
          <Divider />
          <NextLink href={ROUTES.ACCOUNT} as={ROUTES.ACCOUNT}>
            <ListItem button component="a">
              {stateUser.signedIn && (
                <ListItemIcon>
                  <Avatar alt={stateUser.name} src={stateUser.picture} />
                </ListItemIcon>
              )}
              <ListItemText
                primary={stateUser.signedIn ? "Account" : "Sign in"}
              />
            </ListItem>
          </NextLink>
          <ListItem button component="a" href={ROUTES.TWITTER} target="_blank">
            <ListItemIcon>
              <TwitterIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="@Hero35Official" />
          </ListItem>
        </List>
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
      <Container>
        <Hidden implementation="css" smDown>
          <Toolbar disableGutters={true} variant="dense">
            <Box marginRight={1}>
              <Button
                id="stack-button"
                aria-haspopup="true"
                aria-controls="stack-menu"
                className={classes.menuLink}
                style={
                  stateStack.slug !== ""
                    ? {
                        backgroundColor: stateStack.colorBackground,
                        color: stateStack.colorText
                      }
                    : {}
                }
                variant="contained"
                onClick={handleStackButtonClick}
                startIcon={
                  <>
                    {stateStack.slug !== "" && (
                      <Icon classes={{ root: classes.iconRoot }}>
                        <img
                          className={classes.imageIcon}
                          src={`/static/stacks/${stateStack.slug}-inverse.svg`}
                        />
                      </Icon>
                    )}
                  </>
                }
                endIcon={<DropdownIcon />}
              >
                {stateStack.title}
              </Button>
            </Box>
            <Menu
              id="stack-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Divider />
              {CATEGORIES.map(cat => (
                <MenuItem
                  key={cat.id}
                  selected={cat.id === stateStack.id}
                  onClick={event => handleMenuItemClick(event, cat.slug)}
                >
                  {cat.slug !== "" && (
                    <Icon fontSize="large" classes={{ root: classes.iconRoot }}>
                      <img
                        className={classes.imageIcon}
                        src={`/static/stacks/${cat.slug}.svg`}
                      />
                    </Icon>
                  )}
                  <Box
                    marginTop={2}
                    marginBottom={2}
                    marginRight={2}
                    marginLeft={cat.slug !== "" ? 2 : 0}
                  >
                    {cat.title}
                    {cat.id !== "-1" && " hub"}
                  </Box>
                </MenuItem>
              ))}
            </Menu>
            <Box marginRight={1}>
              <MenuLink
                href={stateStack.slug ? `/stack/[stackid]` : ROUTES.HOME}
                as={stateStack.slug ? `/stack/${stateStack.slug}` : ROUTES.HOME}
              >
                Home
              </MenuLink>
            </Box>
            {stateStack.isCurated && (
              <Box marginRight={1}>
                <MenuLink
                  href={`${ROUTES.CURATED}${
                    stateStack.slug ? `?stack=${stateStack.slug}` : ""
                  }`}
                >
                  Curated talks
                </MenuLink>
              </Box>
            )}
            <Box flexGrow="1" marginRight={1}>
              <SearchInput className={classes.search} />
            </Box>
            <Box marginRight={1}>
              <MenuLink href={ROUTES.ACCOUNT}>
                {stateUser.signedIn ? (
                  <>
                    <Avatar alt={stateUser.name} src={stateUser.picture} />{" "}
                  </>
                ) : (
                  "Sign in"
                )}
              </MenuLink>
            </Box>
            <MenuLink
              href={stateStack.slug ? `/stack/[stackid]` : ROUTES.HOME}
              as={stateStack.slug ? `/stack/${stateStack.slug}` : ROUTES.HOME}
            >
              <img src="/static/HERO35-logo.svg" className={classes.logo} />
            </MenuLink>
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
  children
}: {
  href: string;
  as?: string;
  children: any;
}) => {
  const classes = useStyles({});

  return (
    <NextLink href={href} as={as || href} passHref>
      <Button className={classes.menuLink}>{children}</Button>
    </NextLink>
  );
};

export default Navigation;
