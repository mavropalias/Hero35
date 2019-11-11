import { Talk, EventEdition } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import Overview from "../../components/Overview";
import CATEGORIES from "../../constants/categories";

interface Props {
  hotTalks?: Talk[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const StackPage: NextPage<Props> = ({
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

interface QueryProps {
  stackid: string;
}
StackPage.getInitialProps = async (ctx: NextPageContext) => {
  const { stackid: stack } = (ctx.query as unknown) as QueryProps;
  const stackid = CATEGORIES.find(cat => cat.slug === stack).id;
  const [hotTalks, recentEditions, upcomingEditions] = await Promise.all([
    Database.getHotTalks(stackid),
    Database.getRecentEditions(stackid),
    Database.getUpcomingEditions(stackid)
  ]);
  return { hotTalks, recentEditions, upcomingEditions };
};

export default StackPage;
