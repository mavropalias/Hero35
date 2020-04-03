import Database from "../../services/Database";
import { Star as BenefitsIcon } from "@material-ui/icons";
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
      {userStore.name ? (
        <>
          <Typography>{userStore.name}</Typography>
          <Typography color="textSecondary">{userStore.email}</Typography>
        </>
      ) : (
        <>
          <Typography>{userStore.email}</Typography>
        </>
      )}
      <Box marginTop={4} marginBottom={8}>
        <Typography variant="subtitle1">
          <Box display="flex" alignItems="center">
            <BenefitsIcon />
            &nbsp; All members have unrestricted access to all site features and
            our curated newsletter (
            <Link
              color="textSecondary"
              href="https://us5.campaign-archive.com/home/?u=b0fbb89e314c48595973a85dc&id=ad944bf61c"
              target="_blank"
            >
              View past newsletters
            </Link>
            ,&nbsp;
            <Link
              color="textSecondary"
              href="https://hero35.us5.list-manage.com/unsubscribe?u=b0fbb89e314c48595973a85dc&id=ad944bf61c"
              target="_blank"
            >
              Unsubscribe
            </Link>
            ), during the Alpha.
          </Box>
          <Box display="flex" alignItems="center">
            <BenefitsIcon />
            &nbsp;&nbsp;
            <LinkPrefetch
              href={ROUTES.SAVED_TALKS}
              as={ROUTES.SAVED_TALKS}
              passHref
            >
              <Link>My saved talks</Link>
            </LinkPrefetch>
          </Box>
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
