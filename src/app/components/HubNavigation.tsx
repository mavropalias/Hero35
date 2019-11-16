import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Icon,
  ListSubheader,
  Paper,
  Box,
  Link
} from "@material-ui/core";
import { Twitter as TwitterIcon } from "@material-ui/icons";
import { Bookmarks as BookmarksIcon } from "@material-ui/icons";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";
import { UserContext } from "./context-providers/UserContextProvider";
import CATEGORIES from "../constants/categories";
import ROUTES from "../constants/routes";
import { default as NextLink } from "next/link";
import { EventEdition } from "../schema";
import UpcomingEditions from "./UpcomingEditions";
import RecentEditions from "./RecentEditions";
import Stacks from "./Stacks";
import CuratedCountries from "./CuratedCountries";
import CuratedYears from "./CuratedYears";

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
    },
    section: {
      marginBottom: theme.spacing(4)
    }
  })
);

const HubNavigation = ({
  className,
  recentEditions,
  upcomingEditions
}: {
  className?: string;
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}) => {
  const { state: stateStack, dispatch: dispatchStack } = useContext(
    StackContext
  );
  const { state: stateUser } = useContext(UserContext);
  const classes = useStyles({});

  return (
    <nav className={className}>
      <Paper className={classes.section} elevation={4}>
        <List
          aria-labelledby="account-list-subheader"
          subheader={
            <ListSubheader id="account-list-subheader">
              {stateUser.signedIn
                ? stateUser.name || stateUser.email
                : "Account"}
            </ListSubheader>
          }
        >
          <NextLink href={ROUTES.ACCOUNT} as={ROUTES.ACCOUNT}>
            <ListItem button component="a">
              {stateUser.signedIn && (
                <ListItemIcon>
                  <BookmarksIcon color="secondary" />
                </ListItemIcon>
              )}
              <ListItemText
                primary={stateUser.signedIn ? "My saved talks" : "Sign in"}
              />
            </ListItem>
          </NextLink>
        </List>
        <Divider />
        <List
          aria-labelledby="stack-list-subheader"
          subheader={
            <ListSubheader id="stack-list-subheader">Stacks</ListSubheader>
          }
        >
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
                  <Icon classes={{ root: classes.iconRoot }}>
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
        </List>
      </Paper>

      <Box marginTop={1}>
        {recentEditions && (
          <SidebarSection
            title={`Recent ${stateStack.contextTitle} conferences`}
          >
            <RecentEditions editions={recentEditions} />
          </SidebarSection>
        )}
        {upcomingEditions && (
          <SidebarSection
            title={`Upcoming ${stateStack.contextTitle} conferences`}
          >
            <UpcomingEditions editions={upcomingEditions} />
          </SidebarSection>
        )}
        <SidebarSection title={`Hot ${stateStack.contextTitle} topics`}>
          <Stacks bSmall={true} />
        </SidebarSection>
        <SidebarSection
          title={`${stateStack.contextTitle} conferences by country`}
        >
          <CuratedCountries />
        </SidebarSection>
        <SidebarSection
          title={`${stateStack.contextTitle} conferences by year`}
        >
          <CuratedYears />
        </SidebarSection>
      </Box>

      <Typography variant="caption" color="textSecondary">
        <Box display="flex" alignItems="center" padding={2}>
          <TwitterIcon fontSize="inherit" />
          &nbsp;
          <NextLink
            href="https://twitter.com/Hero35Official"
            passHref
            prefetch={false}
          >
            <Link target="_blank" color="inherit">
              Follow us on Twitter
            </Link>
          </NextLink>
        </Box>
      </Typography>
    </nav>
  );
};

const SidebarSection = ({
  title,
  children
}: {
  title?: string;
  children: any;
}) => {
  const classes = useStyles({});
  return (
    <section className={classes.section}>
      {title && (
        <Typography
          variant="overline"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          {title}
        </Typography>
      )}
      {children}
    </section>
  );
};

export default HubNavigation;
