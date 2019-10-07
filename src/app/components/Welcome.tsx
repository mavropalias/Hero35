import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
  Grid,
  Box,
  Container
} from "@material-ui/core";
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
    <Paper elevation={8} square={true}>
      <Box paddingTop={4} paddingBottom={4}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                src="/static/HERO35-logo-tagline.svg"
                className={classes.logo}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                <span className={classes.mainMessage}>
                  Elevate your {"{skills}"} and career
                </span>
              </Typography>
              <Typography variant="h4" paragraph>
                Heroes is <em className={classes.em}>the</em> place to watch
                curated developer conference talks.
              </Typography>
              <Typography
                variant="h6"
                className={classes.success}
                color="textSecondary"
              >
                1000+ talks on React and its surrounding ecosystem.
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" paragraph>
                More stacks (frontend, backend, machine learning, and mobile) on
                the way!
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <SignIn />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Paper>
  );
};

export default Welcome;
