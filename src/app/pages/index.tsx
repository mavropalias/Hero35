import Layout from "../components/Layout";
import TalkGrid from "../components/TalkGrid";
import Editions from "../components/Editions";
import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import { Talk, EventEdition } from "../schema";
import Database from "../services/Database";
import { NextPage } from "next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    feedContainer: {
      marginTop: theme.spacing(2)
    },
    feedItem: {
      marginBottom: theme.spacing(8)
    }
  })
);

interface Props {
  talks?: Talk[];
  editions?: EventEdition[];
}

const Home: NextPage<Props> = ({ talks, editions }) => {
  const classes = useStyles({});

  return (
    <Layout>
      <Box className={classes.feedContainer}>
        <Editions editions={editions} className={classes.feedItem} />
        <TalkGrid talks={talks} />
      </Box>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const talks = await Database.getTalks();
  const editions = await Database.getRecentEditions();
  return { talks, editions };
};

export default Home;
