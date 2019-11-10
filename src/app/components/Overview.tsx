import Layout from "./Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Box
} from "@material-ui/core";
import { Talk, EventEdition } from "../schema";
import CuratedTalks from "./CuratedTalks";
import UpcomingEditions from "./UpcomingEditions";
import CuratedTags from "./CuratedTags";
import CuratedCountries from "./CuratedCountries";
import CuratedYears from "./CuratedYears";
import Welcome from "./Welcome";
import Stacks from "./Stacks";
import { useContext } from "react";
import { UserContext } from "./context-providers/UserContextProvider";
import RecentEditions from "./RecentEditions";
import { StackContext } from "./context-providers/StackContextProvider";
import HotTalks from "./HotTalks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(8)
    },
    section: {
      marginBottom: theme.spacing(8)
    }
  })
);

interface Props {
  curatedTalks?: Talk[];
  hotTalks?: Talk[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const Overview = ({
  curatedTalks,
  hotTalks,
  recentEditions,
  upcomingEditions
}: Props) => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});
  const { state, dispatch } = useContext(UserContext);

  return (
    <Layout
      title={`${stateStack.contextTitle} Techtalks`}
      description={`The single source of truth for ${stateStack.contextTitle} developer conferences & talks.`}
    >
      {!state.signedIn && <Welcome />}
      <Box paddingTop={4} paddingBottom={4}>
        <Container>
          <Stacks />
        </Container>
      </Box>
      <Container className={classes.container}>
        {hotTalks && <HotTalks talks={hotTalks} className={classes.section} />}
        {stateStack.isCurated && (
          <CuratedTalks talks={curatedTalks} className={classes.section} />
        )}
        <RecentEditions editions={recentEditions} className={classes.section} />
        {upcomingEditions.length > 0 && (
          <UpcomingEditions
            editions={upcomingEditions}
            className={classes.section}
          />
        )}
        {stateStack.hasHotTopics && <CuratedTags className={classes.section} />}
        <CuratedCountries className={classes.section} />
        <CuratedYears className={classes.section} />
      </Container>
    </Layout>
  );
};

export default Overview;
