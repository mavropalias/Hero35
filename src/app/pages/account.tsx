import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import { makeStyles, createStyles, Theme, Container } from "@material-ui/core";
import AccountDetails from "../components/user/AccountDetails";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/useStores";

const SignIn = dynamic(() => import("../components/SignIn"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    }
  })
);

const Account = observer(() => {
  const { userStore } = useStores();
  const classes = useStyles({});

  return (
    <Layout title="Account">
      <Container className={classes.container}>
        {userStore.isSignedIn && <AccountDetails />}
      </Container>
    </Layout>
  );
});

export default Account;
