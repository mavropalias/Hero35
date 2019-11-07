import { Talk, EventEdition } from "../schema";
import Database from "../services/Database";
import { NextPage } from "next";
import Overview from "../components/Overview";

interface Props {
  curatedTalks?: Talk[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const Home: NextPage<Props> = ({
  curatedTalks,
  recentEditions,
  upcomingEditions
}) => (
  <Overview
    curatedTalks={curatedTalks}
    recentEditions={recentEditions}
    upcomingEditions={upcomingEditions}
  />
);

Home.getInitialProps = async () => {
  const [curatedTalks, recentEditions, upcomingEditions] = await Promise.all([
    Database.getCuratedTalks(),
    Database.getRecentEditions(),
    Database.getUpcomingEditions()
  ]);
  return { curatedTalks, recentEditions, upcomingEditions };
};

export default Home;
