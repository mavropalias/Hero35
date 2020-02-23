import Layout from "../components/Layout";
import { TalkBasic } from "../schema";
import Database from "../services/Database";
import { NextPage, NextPageContext } from "next";
import TalkChart from "../components/TalkChart";
import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Link
} from "@material-ui/core";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react-lite";

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

const Charts: NextPage<Props> = observer(({ talks }) => {
  const { userStore } = useStores();
  const classes = useStyles({});
  return (
    <Layout title={`Top 100 dev conference talks`}>
      <Container className={classes.container}>
        <Typography variant="h3" component="h1">
          Top 100 talks
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          From React/JavaScript/CSS conferences, over the past 365 days. Sorted
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
                  Sign in to view the complete TOP 100
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
Charts.getInitialProps = async (ctx: NextPageContext) => {
  const talks: TalkBasic[] = await Database.getTopTalks();
  return { talks };
};

export default Charts;
