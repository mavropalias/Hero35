import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Button
} from "@material-ui/core";
import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import AccountDetails from "../components/AccountDetails";
const SignIn = dynamic(() => import("../components/SignIn"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    },
    logo: {
      marginBottom: theme.spacing(3),
      width: "80%"
    }
  })
);

const Account = () => {
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles({});

  return (
    <Layout>
      <Container className={classes.container}>
        {!state || !state.signedIn ? (
          <>
            <SignIn />
            {/* <Button
              onClick={e => {
                dispatch({
                  type: "login",
                  payload: {
                    name: "Kostas Mavropalias",
                    picture:
                      "https://lh3.googleusercontent.com/a-/AAuE7mC0cseak5_9MHDfch3YYDUEqHssCt8TIc7p1mtD6EQ",
                    signedIn: true
                  }
                });
              }}
            >
              Login
            </Button> */}
          </>
        ) : (
          <AccountDetails />
        )}
      </Container>
    </Layout>
  );
};

export default Account;
