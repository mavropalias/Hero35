import { Talk, EventEdition } from "../schema";
import Database from "../services/Database";
import { NextPage } from "next";
import Overview from "../components/Overview";

interface Props {
  curatedTalks?: Talk[];
  hotTalks?: Talk[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const Home: NextPage<Props> = ({
  curatedTalks,
  hotTalks,
  recentEditions,
  upcomingEditions
}) => (
  <Overview
    curatedTalks={curatedTalks}
    hotTalks={hotTalks}
    recentEditions={recentEditions}
    upcomingEditions={upcomingEditions}
  />
);

Home.getInitialProps = async () => {
  const [
    curatedTalks,
    hotTalks,
    recentEditions,
    upcomingEditions
  ] = await Promise.all([
    Database.getCuratedTalks(),
    Database.getHotTalks(),
    Database.getRecentEditions(),
    Database.getUpcomingEditions()
  ]);
  return { curatedTalks, hotTalks, recentEditions, upcomingEditions };
};

export default Home;
