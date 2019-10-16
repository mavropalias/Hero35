import { default as NextLink } from "next/link";
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
import { UserContext } from "../components/UserContextProvider";
import Welcome from "../components/Welcome";
import ROUTES from "../constants/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4)
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
        <Grid container spacing={2} justify="center">
          <Grid item>&copy; Heroes, all rights reserved.</Grid>
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
          <Grid item>
            <NextLink
              href="https://twitter.com/Hero35Official"
              passHref
              prefetch={false}
            >
              <Link target="_blank" color="inherit">
                Follow us on Twitter
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Typography>
    </Container>
  );
};

export default Footer;
