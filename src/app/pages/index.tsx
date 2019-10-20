import Layout from "../components/Layout";
import EditionGrid from "../components/EditionGrid";
import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Container,
  Hidden
} from "@material-ui/core";
import { Talk, EventEdition } from "../schema";
import Database from "../services/Database";
import { NextPage } from "next";
import CuratedTalks from "../components/CuratedTalks";
import UpcomingEditions from "../components/UpcomingEditions";
import CuratedTags from "../components/CuratedTags";
import CuratedCountries from "../components/CuratedCountries";
import CuratedYears from "../components/CuratedYears";
import Welcome from "../components/Welcome";
import Stacks from "../components/Stacks";
import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import RecentEditions from "../components/RecentEditions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homeContainer: {
      marginTop: theme.spacing(10)
    },
    homeSection: {
      marginBottom: theme.spacing(10)
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
  const { state, dispatch } = useContext(UserContext);

  return (
    <Layout
      title="Dev conference talks"
      description="The single source of truth for React developer conferences & talks."
    >
      {!state.signedIn && <Welcome />}
      <Stacks />
      <Container className={classes.homeContainer}>
        <CuratedTalks talks={curatedTalks} className={classes.homeSection} />
        <RecentEditions
          editions={recentEditions}
          className={classes.homeSection}
        />
        <UpcomingEditions
          editions={upcomingEditions}
          className={classes.homeSection}
        />
        <Grid container className={classes.homeSection}>
          <Grid item xs={12} md={6}>
            <CuratedTags />
          </Grid>
          <Grid item xs={12} md={6}>
            <CuratedCountries />
          </Grid>
        </Grid>
        <CuratedYears className={classes.homeSection} />
      </Container>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const [curatedTalks, recentEditions, upcomingEditions] = await Promise.all([
    Database.getCuratedTalks(),
    Database.getRecentEditions(),
    Database.getUpcomingEditions()
  ]);
  return { curatedTalks, recentEditions, upcomingEditions };
};

export default Home;
