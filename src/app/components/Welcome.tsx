import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
  Grid,
  Box,
  Container,
  Divider
} from "@material-ui/core";
import { DoneOutline as BulletIcon } from "@material-ui/icons";
import dynamic from "next/dynamic";
const SignIn = dynamic(() => import("./SignIn"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    em: {
      fontStyle: "normal",
      "text-decoration-color": "#91DD64",
      "text-decoration-style": "double",
      "text-decoration-line": "underline"
    },
    logo: {
      maxWidth: "200px"
    },
    mainContainer: {
      background: `linear-gradient(35deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
    },
    mainMessage: {
      color: theme.palette.background.default,
      background: theme.palette.secondary.main,
      padding: theme.spacing(0, 1),
      display: "inline",
      fontWeight: 500,
      lineHeight: 1
    },
    success: {
      color: "#91DD64"
    }
  })
);

const Welcome = () => {
  const classes = useStyles({});

  return (
    <>
      <Box paddingTop={4} paddingBottom={2} className={classes.mainContainer}>
        <Container>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12}>
              <Box textAlign="center" marginTop={8} marginBottom={6}>
                <Typography variant="h1" gutterBottom>
                  <img
                    src="/static/HERO35-logo-tagline.svg"
                    className={classes.logo}
                  />
                </Typography>
                <Typography variant="h4" paragraph>
                  <span className={classes.mainMessage}>
                    Elevate your {"{skills}"} and career
                  </span>
                </Typography>
                <Typography variant="h4" paragraph>
                  Heroes is <em className={classes.em}>the</em> place to watch
                  developer conference talks
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={1} alignItems="baseline" wrap="nowrap">
                <Grid item>
                  <BulletIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.success}>
                    1700+ educational talks on React, JavaScript and their
                    ecosystems.
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="baseline" wrap="nowrap">
                <Grid item>
                  <BulletIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.success}>
                    New talks and events added continually
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="baseline" wrap="nowrap">
                <Grid item>
                  <BulletIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.success}>
                    Watch the best of the best in our Curated section
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="baseline" wrap="nowrap">
                <Grid item>
                  <BulletIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={classes.success}>
                    More stacks (frontend, backend, machine learning, & mobile)
                    on the way!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Box marginTop={6} marginBottom={6}>
                <SignIn />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Welcome;
