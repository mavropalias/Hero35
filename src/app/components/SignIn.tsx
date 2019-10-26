import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { fade } from "@material-ui/core/styles/colorManipulator";
import firebase from "firebase/app";
import {
  Typography,
  Paper,
  Box,
  makeStyles,
  Theme,
  createStyles,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ticket: {
      background: `url("/static/HERO35-logo-tagline.svg")`,
      backgroundSize: "contain",
      borderRadius: 0,
      backgroundAttachment: "fixed",
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.up("sm")]: {
        border: "11px solid rgba(0,0,0,.85)"
      }
    },
    ticketInner: {
      padding: theme.spacing(1),
      background: `${fade(theme.palette.background.default, 0.98)}`,
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4, 4, 1, 4)
      }
    },
    ticketTitle: {
      background: `linear-gradient(35deg, ${theme.palette.secondary.main} 35%, ${theme.palette.secondary.contrastText} 140%)`,
      ["-webkit-background-clip"]: "text",
      ["background-clip"]: "text",
      ["text-fill-color"]: "transparent"
    },
    ticketCaptionContainer: {
      textAlign: "center"
    },
    ticketCaption: {
      lineHeight: "1"
    }
  })
);

const SignIn = () => {
  const classes = useStyles({});
  if (!firebase.auth) return <></>;

  // Configure FirebaseUI.
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: _ => false
    },
    tosUrl: "/terms-of-service",
    privacyPolicyUrl: "/privacy-policy"
  };

  return (
    <Paper elevation={8} className={classes.ticket}>
      <Grid container spacing={2} className={classes.ticketInner}>
        <Grid item xs={12} md={7}>
          <Typography
            variant="h1"
            color="secondary"
            className={classes.ticketTitle}
          >
            Sign up now & get free lifetime benefits*
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Grid>
        <Grid item xs={12} className={classes.ticketCaptionContainer}>
          <Typography
            variant="overline"
            color="textSecondary"
            className={classes.ticketCaption}
          >
            * All members that sign up during our ALPHA, or BETA, will be
            eligible for free, lifetime account benefits post-BETA. Details will
            be announced during BETA.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SignIn;
