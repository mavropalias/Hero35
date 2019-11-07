import { Talk, EventEdition } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import Overview from "../../components/Overview";
import CATEGORIES from "../../constants/categories";

interface Props {
  curatedTalks?: Talk[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const StackPage: NextPage<Props> = ({
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

interface QueryProps {
  stackid: string;
}
StackPage.getInitialProps = async (ctx: NextPageContext) => {
  const { stackid: stack } = (ctx.query as unknown) as QueryProps;
  const stackid = CATEGORIES.find(cat => cat.slug === stack).id;
  const [curatedTalks, recentEditions, upcomingEditions] = await Promise.all([
    Database.getCuratedTalks(stackid),
    Database.getRecentEditions(stackid),
    Database.getUpcomingEditions(stackid)
  ]);
  return { curatedTalks, recentEditions, upcomingEditions };
};

export default StackPage;
