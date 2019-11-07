import { default as NextLink } from "next/link";
import { Twitter as TwitterIcon } from "@material-ui/icons";
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
import { useContext } from "react";
import { UserContext } from "./context-providers/UserContextProvider";
import Welcome from "../components/Welcome";
import ROUTES from "../constants/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(12)
    }
  })
);

const Footer = ({ path }) => {
  const classes = useStyles({});
  const { state, dispatch } = useContext(UserContext);

  return (
    <Container className={classes.container}>
      {!state.signedIn && path !== ROUTES.HOME && path !== ROUTES.ACCOUNT && (
        <Box marginBottom={4}>
          <Welcome />
        </Box>
      )}
      <Typography variant="caption" color="textSecondary">
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item>&copy; Heroes, all rights reserved.</Grid>
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
                  Follow us on Twitter
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
};

export default Footer;
