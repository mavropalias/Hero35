import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Container,
  Paper,
  Typography
} from "@material-ui/core";
import firebase from "firebase/app";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      marginBottom: theme.spacing(3),
      width: "80%"
    }
  })
);

const SignIn = () => {
  const classes = useStyles({});

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
    //TODO update urls
    tosUrl: "/",
    privacyPolicyUrl: "/"
  };

  return (
    <Container maxWidth="xs">
      <Paper>
        <Box
          marginTop={4}
          padding={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <img src="/static/HERO35-logo-tagline.svg" className={classes.logo} />
          <Typography component="h1" variant="subtitle1">
            Sign in with your favourite provider
          </Typography>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
