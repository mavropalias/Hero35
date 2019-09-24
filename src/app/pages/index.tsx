import Layout from "../components/Layout";
import EditionGrid from "../components/EditionGrid";
import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import { Talk, EventEdition } from "../schema";
import Database from "../services/Database";
import { NextPage } from "next";
import CuratedTalks from "../components/CuratedTalks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    feedContainer: {
      marginTop: theme.spacing(2)
    },
    feedItem: {
      marginBottom: theme.spacing(6)
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
        <CuratedTalks talks={talks} className={classes.feedItem} />
        <EditionGrid editions={editions} className={classes.feedItem} />
      </Box>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const talks = await Database.getCuratedTalks();
  const editions = await Database.getRecentEditions();
  return { talks, editions };
};

export default Home;
