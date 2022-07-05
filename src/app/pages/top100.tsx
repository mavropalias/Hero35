import {
  Box,
  Container,
  createStyles,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { NextPage, NextPageContext } from "next";
import Layout from "../components/Layout";
import TalkChart from "../components/TalkChart";
import { TalkBasic } from "../schema";
import Database from "../services/Database";
import { useStores } from "../stores/useStores";

interface Props {
  talks: TalkBasic[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(6)
    },
    signupPrompt: {
      width: "max-content",
      maxWidth: theme.spacing(100),
      margin: theme.spacing(2, 0)
    }
  })
);

const Top100: NextPage<Props> = observer(({ talks }) => {
  const { userStore } = useStores();
  const classes = useStyles({});
  return (
    <Layout title={`Top 100 dev conference talks`}>
      <Container className={classes.container}>
        <Typography variant="h3" component="h1">
          Top 100 talks
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          From React/JavaScript/CSS conferences, over the past 4 years. Sorted
          by number of likes.
        </Typography>
        {userStore.isSignedIn ? (
          <TalkChart talks={talks} />
        ) : (
          <>
            <TalkChart talks={talks.slice(0, 5)} />
            <Paper className={classes.signupPrompt}>
              <Box padding={2}>
                <Link
                  href="#"
                  variant="h6"
                  color="secondary"
                  onClick={_ => userStore.setShouldSignIn(true)}
                >
                  Sign in to view the full TOP 100
                </Link>
              </Box>
            </Paper>
          </>
        )}
      </Container>
    </Layout>
  );
});

interface QueryProps {
  topicid: string;
  stack?: string;
}
Top100.getInitialProps = async (ctx: NextPageContext) => {
  const talks: TalkBasic[] = await Database.getTopTalks();
  return { talks };
};

export default Top100;
