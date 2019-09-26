import Layout from "../components/Layout";
import EditionGrid from "../components/EditionGrid";
import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import { Talk, EventEdition } from "../schema";
import Database from "../services/Database";
import { NextPage } from "next";
import CuratedTalks from "../components/CuratedTalks";
import UpcomingEditions from "../components/UpcomingEditions";
import CuratedTags from "../components/CuratedTags";
import CuratedCountries from "../components/CuratedCountries";
import CuratedYears from "../components/CuratedYears";

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
  curatedTalks?: Talk[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const Home: NextPage<Props> = ({
  curatedTalks,
  recentEditions,
  upcomingEditions
}) => {
  const classes = useStyles({});

  return (
    <Layout>
      <Box className={classes.feedContainer}>
        <CuratedTalks talks={curatedTalks} className={classes.feedItem} />
        <EditionGrid editions={recentEditions} className={classes.feedItem} />
        <UpcomingEditions
          editions={upcomingEditions}
          className={classes.feedItem}
        />
        <CuratedTags className={classes.feedItem} />
        <CuratedCountries className={classes.feedItem} />
        <CuratedYears className={classes.feedItem} />
      </Box>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const curatedTalks = await Database.getCuratedTalks();
  const recentEditions = await Database.getRecentEditions();
  const upcomingEditions = await Database.getUpcomingEditions();
  return { curatedTalks, recentEditions, upcomingEditions };
};

export default Home;
