import { Talk, EventEdition } from "../schema";
import Database from "../services/Database";
import { NextPage } from "next";
import Hub from "../components/Hub";

interface Props {
  hotTalks?: Talk[];
  justAddedEditions?: EventEdition[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const Home: NextPage<Props> = ({
  hotTalks,
  justAddedEditions,
  recentEditions,
  upcomingEditions
}) => (
  <Hub
    hotTalks={hotTalks}
    justAddedEditions={justAddedEditions}
    recentEditions={recentEditions}
    upcomingEditions={upcomingEditions}
  />
);

Home.getInitialProps = async () => {
  const [
    hotTalks,
    justAddedEditions,
    recentEditions,
    upcomingEditions
  ] = await Promise.all([
    Database.getHotTalks(),
    Database.getJustAddedEditions(),
    Database.getRecentEditions(),
    Database.getUpcomingEditions()
  ]);
  return { hotTalks, justAddedEditions, recentEditions, upcomingEditions };
};

export default Home;
