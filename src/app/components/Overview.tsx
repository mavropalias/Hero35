import Layout from "./Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Box,
  Typography
} from "@material-ui/core";
import { Talk, EventEdition } from "../schema";
import UpcomingEditions from "./UpcomingEditions";
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
      marginTop: theme.spacing(4)
    },
    section: {
      marginBottom: theme.spacing(8),
      maxWidth: `calc(100vw - ${theme.spacing(6)}px)`
    },
    sectionTitle: {
      fontWeight: "bold"
    }
  })
);

interface Props {
  hotTalks?: Talk[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const Overview = ({ hotTalks, recentEditions, upcomingEditions }: Props) => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});
  const { state, dispatch } = useContext(UserContext);

  return (
    <Layout
      title={`${stateStack.contextTitle} Techtalks`}
      description={`The single source of truth for ${stateStack.contextTitle} developer conferences & talks.`}
    >
      {!state.signedIn && <Welcome />}
      <Container className={classes.container}>
        <OverviewSection
          title={`Recent ${stateStack.contextTitle} conferences`}
        >
          <RecentEditions editions={recentEditions} />
        </OverviewSection>
        {hotTalks && (
          <OverviewSection title={`Hot ${stateStack.contextTitle} talks`}>
            <HotTalks talks={hotTalks} />
          </OverviewSection>
        )}
        <OverviewSection title={`Hot ${stateStack.contextTitle} topics`}>
          <Stacks />
        </OverviewSection>
        {upcomingEditions && (
          <OverviewSection
            title={`Upcoming ${stateStack.contextTitle} conferences`}
          >
            <UpcomingEditions editions={upcomingEditions} />
          </OverviewSection>
        )}
        <OverviewSection
          title={`${stateStack.contextTitle} conferences by country`}
        >
          <CuratedCountries />
        </OverviewSection>
        <OverviewSection
          title={`${stateStack.contextTitle} conferences by year`}
        >
          <CuratedYears />
        </OverviewSection>
      </Container>
    </Layout>
  );
};

const OverviewSection = ({
  title,
  children
}: {
  title?: string;
  children: any;
}) => {
  const classes = useStyles({});
  return (
    <section className={classes.section}>
      {title && (
        <Typography
          className={classes.sectionTitle}
          variant="overline"
          component="h2"
          gutterBottom
        >
          {title}
        </Typography>
      )}
      {children}
    </section>
  );
};

export default Overview;
