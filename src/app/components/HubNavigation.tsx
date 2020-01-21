import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Icon,
  ListSubheader,
  Paper
} from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";
import {
  Bookmarks as BookmarksIcon,
  Event as EventIcon
} from "@material-ui/icons";
import ROUTES from "../constants/routes";
import { Stack } from "../schema";
import LinkPrefetch from "./LinkPrefetch";
import STACKS from "../constants/stacks";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react-lite";

const HubNavigation = ({ className }: { className?: string }) => {
  const { userStore } = useStores();
  return (
    <nav className={className}>
      <Paper elevation={4}>
        <List
          aria-labelledby="account-list-subheader"
          subheader={
            <ListSubheader id="account-list-subheader">
              {userStore.isSignedIn
                ? userStore.name || userStore.email
                : "Account"}
            </ListSubheader>
          }
        >
          <LinkPrefetch href={ROUTES.ACCOUNT} as={ROUTES.ACCOUNT}>
            <ListItem button component="a">
              {userStore.isSignedIn && (
                <ListItemIcon>
                  <BookmarksIcon />
                </ListItemIcon>
              )}
              <ListItemText
                primary={
                  userStore.isSignedIn ? "My saved talks" : "Sign up / in"
                }
              />
            </ListItem>
          </LinkPrefetch>
          <LinkPrefetch href="/year/[yearid]" as="/year/2020">
            <ListItem button component="a">
              {userStore.isSignedIn && (
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
              )}
              <ListItemText primary="Conferences" />
            </ListItem>
          </LinkPrefetch>
        </List>
        <Divider />
        <List
          aria-labelledby="stack-list-subheader-stacks"
          subheader={
            <ListSubheader id="stack-list-subheader-stacks">
              Stacks
            </ListSubheader>
          }
        >
          {STACKS.filter(stack => stack.isPrime === true).map(stack => (
            <StackLink stack={stack} />
          ))}
        </List>
        <Divider />
        <List
          aria-labelledby="stack-list-subheader-morestacks"
          subheader={
            <ListSubheader id="stack-list-subheader-morestacks">
              More Stacks
            </ListSubheader>
          }
        >
          {STACKS.filter(stack => stack.featured === true).map(stack => (
            <StackLink stack={stack} />
          ))}
        </List>
      </Paper>
    </nav>
  );
};

const StackLink = ({ stack }: { stack: Stack }) => (
  <LinkPrefetch
    href={`/topic/[topicid]`}
    as={`/topic/${stack.slug}`}
    passHref
    key={stack.slug}
  >
    <ListItem button>
      <ListItemIcon>
        {stack.slug !== "" ? (
          <Icon>
            <img
              src={`/stacks/${stack.slug}.svg`}
              style={{
                display: "block",
                height: "100%",
                width: "100%"
              }}
            />
          </Icon>
        ) : (
          <HomeIcon />
        )}
      </ListItemIcon>
      <ListItemText primary={`${stack.label}`} />
    </ListItem>
  </LinkPrefetch>
);

export default HubNavigation;
