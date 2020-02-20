import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import { makeStyles, createStyles, Theme, Container } from "@material-ui/core";
import SavedTalks from "../components/user/SavedTalks";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/useStores";

const SignIn = dynamic(() => import("../components/SignIn"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(6)
    }
  })
);

const PageSavedTalks = observer(() => {
  const { userStore } = useStores();
  const classes = useStyles({});

  return (
    <Layout title="Saved talks">
      <Container className={classes.container}>
        {!userStore.isSignedIn ? <SignIn /> : <SavedTalks />}
      </Container>
    </Layout>
  );
});

export default PageSavedTalks;
