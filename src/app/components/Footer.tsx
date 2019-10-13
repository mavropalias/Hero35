import { default as NextLink } from "next/link";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Typography,
  Link,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(4)
    }
  })
);

const Footer = () => {
  const classes = useStyles({});

  return (
    <Container className={classes.container}>
      <Typography variant="caption" color="textSecondary">
        <Grid container spacing={2} justify="center">
          <Grid item>&copy; Heroes, all rights reserved.</Grid>
          <Grid item>
            <NextLink href="/privacy-policy" as="/privacy-policy" passHref>
              <Link color="inherit">Privacy policy</Link>
            </NextLink>
          </Grid>
          <Grid item>
            <NextLink href="/terms-of-service" as="/terms-of-service" passHref>
              <Link color="inherit">Terms of Service</Link>
            </NextLink>
          </Grid>
          <Grid item>
            <NextLink href="https://twitter.com/Hero35Official" passHref>
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
