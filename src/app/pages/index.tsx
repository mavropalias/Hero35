import Layout from "../components/Layout";
import EditionGrid from "../components/EditionGrid";
import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Container
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    feedContainer: {
      marginTop: theme.spacing(2)
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
    <Layout description="The single source of truth for React developer conferences & talks.">
      {!state.signedIn && <Welcome />}
      <Stacks />
      <Container>
        <Grid spacing={8} container className={classes.feedContainer}>
          <Grid item sm={12}>
            <CuratedTalks talks={curatedTalks} />
          </Grid>
          <Grid item sm={12}>
            <EditionGrid editions={recentEditions} />
          </Grid>
          <Grid item sm={12}>
            <UpcomingEditions editions={upcomingEditions} />
          </Grid>
          <Grid item sm={12} md={6}>
            <CuratedTags />
          </Grid>
          <Grid item sm={12} md={6}>
            <CuratedCountries />
          </Grid>
          <Grid item>
            <CuratedYears />
          </Grid>
        </Grid>
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
