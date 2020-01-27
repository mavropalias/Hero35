import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress
} from "@material-ui/core";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react-lite";

const SignIn = observer(() => {
  const { userStore } = useStores();

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
      // Do not redirect after sign-in
      signInSuccessWithAuthResult: _ => false
    },
    tosUrl: "/terms-of-service",
    privacyPolicyUrl: "/privacy-policy"
  };

  const handleClose = () => {
    userStore.setShouldSignIn(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={userStore.shouldSignIn}
    >
      <DialogTitle id="simple-dialog-title">Sign in</DialogTitle>
      <DialogContent>
        {firebase.auth ? (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        ) : (
          <CircularProgress />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default SignIn;
