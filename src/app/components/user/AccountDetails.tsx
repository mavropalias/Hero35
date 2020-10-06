import Database from "../../services/Database";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Button,
  Avatar,
  Link,
  Box,
  List,
  ListSubheader,
  ListItemIcon,
  ListItem,
  ListItemText
} from "@material-ui/core";
import {
  Bookmarks as BookmarksIcon,
  Email as NewsletterIcon,
  Event as EventIcon,
  FormatListNumbered as ChartIcon,
  Inbox as PastEditionsIcon,
  Unsubscribe as UnsubscribeIcon
} from "@material-ui/icons";
import LinkPrefetch from "../LinkPrefetch";
import ROUTES from "../../constants/routes";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/useStores";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      width: 100,
      height: 100
    },
    container: {
      marginTop: theme.spacing(6)
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const AccountDetails = observer(() => {
  const { userStore } = useStores();
  const classes = useStyles({});

  return (
    <Container className={classes.container}>
      <Avatar
        title={`${userStore.name || ""} ${userStore.email}`}
        src={userStore.picture}
        className={classes.avatar}
      />
      <Box marginTop={4} marginBottom={8}>
        <List
          aria-labelledby="account-list-subheader"
          subheader={
            <ListSubheader id="account-list-subheader">
              {userStore.name ? <>{userStore.name}</> : <>{userStore.email}</>}
            </ListSubheader>
          }
        >
          <LinkPrefetch href={ROUTES.SAVED_TALKS} as={ROUTES.SAVED_TALKS}>
            <ListItem button component="a">
              <ListItemIcon>
                <BookmarksIcon />
              </ListItemIcon>
              <ListItemText primary="My saved talks" />
            </ListItem>
          </LinkPrefetch>
          <LinkPrefetch href="/top100" as="/top100">
            <ListItem button component="a">
              <ListItemIcon>
                <ChartIcon />
              </ListItemIcon>
              <ListItemText primary="Top 100 talks" />
            </ListItem>
          </LinkPrefetch>
          <LinkPrefetch href="/year/[yearid]" as="/year/2020">
            <ListItem button component="a">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Conferences" />
            </ListItem>
          </LinkPrefetch>
          <ListItem>
            <ListItemIcon>
              <NewsletterIcon />
            </ListItemIcon>
            <ListItemText primary="Newsletter" />
          </ListItem>
          <List component="div" disablePadding>
            <Link
              href="https://us5.campaign-archive.com/home/?u=b0fbb89e314c48595973a85dc&id=ad944bf61c"
              target="_blank"
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <PastEditionsIcon />
                </ListItemIcon>
                <ListItemText primary="Past editions" />
              </ListItem>
            </Link>
            <Link
              href="https://hero35.us5.list-manage.com/unsubscribe?u=b0fbb89e314c48595973a85dc&id=ad944bf61c"
              target="_blank"
            >
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <UnsubscribeIcon />
                </ListItemIcon>
                <ListItemText primary="Unsubscribe" />
              </ListItem>
            </Link>
          </List>
        </List>
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => Database.auth.signOut()}
      >
        Sign out
      </Button>
    </Container>
  );
});

export default AccountDetails;
