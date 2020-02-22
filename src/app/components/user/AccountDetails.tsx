import Database from "../../services/Database";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Button,
  Avatar,
  Typography,
  Link,
  Box
} from "@material-ui/core";
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
    }
  })
);

const AccountDetails = observer(() => {
  const { userStore } = useStores();
  const classes = useStyles({});

  return (
    <Container className={classes.container}>
      <Avatar
        alt={userStore.name}
        src={userStore.picture}
        className={classes.avatar}
      />
      <Typography color="textSecondary" paragraph>
        {userStore.name || userStore.email}
      </Typography>
      <Box marginBottom={8}>
        <Typography variant="h6">Welcome!</Typography>
        <Typography variant="subtitle1">
          Since you registered during our Alpha, you're entitled to free
          lifetime benefits on Hero35. We'll announce details during our Beta
          phase.
        </Typography>
        <Typography variant="subtitle1" paragraph>
          All members have unrestricted access to all site features, during the
          Alpha.
        </Typography>
        <Typography variant="subtitle1" paragraph>
          <LinkPrefetch
            href={ROUTES.SAVED_TALKS}
            as={ROUTES.SAVED_TALKS}
            passHref
          >
            <Link>My saved talks</Link>
          </LinkPrefetch>
        </Typography>
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
