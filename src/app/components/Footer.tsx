import { default as NextLink } from "next/link";
import {
  Twitter as TwitterIcon,
  Facebook as FacebookIcon
} from "@material-ui/icons";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Typography,
  Link,
  Grid,
  Box
} from "@material-ui/core";
import Welcome from "../components/Welcome";
import ROUTES from "../constants/routes";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(12)
    }
  })
);

const Footer = observer(() => {
  const classes = useStyles({});
  const { userStore } = useStores();
  return (
    <Container className={classes.container} component="footer">
      {!userStore.isSignedIn && (
        <Box marginBottom={4}>
          <Welcome />
        </Box>
      )}
      <Typography variant="caption" color="textSecondary">
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item>&copy; Hero35, all rights reserved.</Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <TwitterIcon fontSize="small" />
              &nbsp;
              <NextLink
                href="https://twitter.com/Hero35Official"
                passHref
                prefetch={false}
              >
                <Link target="_blank" color="inherit">
                  Twitter
                </Link>
              </NextLink>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center">
              <FacebookIcon fontSize="small" />
              &nbsp;
              <NextLink
                href="https://www.facebook.com/hero35official/"
                passHref
                prefetch={false}
              >
                <Link target="_blank" color="inherit">
                  Facebook
                </Link>
              </NextLink>
            </Box>
          </Grid>
          <Grid item>
            <NextLink
              href="/privacy-policy"
              as="/privacy-policy"
              passHref
              prefetch={false}
            >
              <Link color="inherit">Privacy policy</Link>
            </NextLink>
          </Grid>
          <Grid item>
            <NextLink
              href="/terms-of-service"
              as="/terms-of-service"
              passHref
              prefetch={false}
            >
              <Link color="inherit">Terms of Service</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Typography>
    </Container>
  );
});

export default Footer;
