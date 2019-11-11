import { Talk, EventEdition } from "../schema";
import Database from "../services/Database";
import { NextPage } from "next";
import Overview from "../components/Overview";

interface Props {
  hotTalks?: Talk[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const Home: NextPage<Props> = ({
  hotTalks,
  recentEditions,
  upcomingEditions
}) => (
  <Overview
    hotTalks={hotTalks}
    recentEditions={recentEditions}
    upcomingEditions={upcomingEditions}
  />
);

Home.getInitialProps = async () => {
  const [hotTalks, recentEditions, upcomingEditions] = await Promise.all([
    Database.getHotTalks(),
    Database.getRecentEditions(),
    Database.getUpcomingEditions()
  ]);
  return { hotTalks, recentEditions, upcomingEditions };
};

export default Home;
