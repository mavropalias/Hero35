import Layout from "./Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Hidden
} from "@material-ui/core";
import { Talk, EventEdition } from "../schema";
import Welcome from "./Welcome";
import { useContext } from "react";
import { UserContext } from "./context-providers/UserContextProvider";
import { StackContext } from "./context-providers/StackContextProvider";
import HubFeed from "./HubFeed";
import HubNavigation from "./HubNavigation";
import HubHeader from "./HubHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(4)
    },
    feed: {
      width: `100%`,
      display: "inline-block",
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - 300px - ${theme.spacing(8)}px)`
      }
    },
    navigation: {
      float: "left",
      display: "inline-block",
      width: "300px",
      marginRight: theme.spacing(8)
    },
    sidebar: {
      float: "right",
      display: "inline-block",
      width: "300px",
      marginLeft: theme.spacing(8)
    }
  })
);

interface Props {
  hotTalks?: Talk[];
  justAddedEditions?: EventEdition[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const Hub = ({
  hotTalks,
  justAddedEditions,
  recentEditions,
  upcomingEditions
}: Props) => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});
  const { state } = useContext(UserContext);

  return (
    <Layout
      title={`${stateStack.contextTitle} Techtalks`}
      description={`The single source of truth for ${stateStack.contextTitle} developer conferences & talks.`}
    >
      {!state.signedIn && <Welcome />}
      <Container className={classes.container} maxWidth="xl">
        <HubHeader editions={justAddedEditions} />
        <Hidden implementation="css" smDown>
          <HubNavigation
            recentEditions={recentEditions}
            upcomingEditions={upcomingEditions}
            className={classes.navigation}
          />
        </Hidden>
        <HubFeed className={classes.feed} hotTalks={hotTalks} />
      </Container>
    </Layout>
  );
};

export default Hub;
