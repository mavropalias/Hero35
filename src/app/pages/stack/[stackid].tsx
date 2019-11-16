import { Talk, EventEdition } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import Hub from "../../components/Hub";
import CATEGORIES from "../../constants/categories";

interface Props {
  hotTalks?: Talk[];
  justAddedEditions?: EventEdition[];
  recentEditions?: EventEdition[];
  upcomingEditions?: EventEdition[];
}

const StackPage: NextPage<Props> = ({
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

interface QueryProps {
  stackid: string;
}
StackPage.getInitialProps = async (ctx: NextPageContext) => {
  const { stackid: stack } = (ctx.query as unknown) as QueryProps;
  const stackid = CATEGORIES.find(cat => cat.slug === stack).id;
  const [
    hotTalks,
    justAddedEditions,
    recentEditions,
    upcomingEditions
  ] = await Promise.all([
    Database.getHotTalks(stackid),
    Database.getJustAddedEditions(stackid),
    Database.getRecentEditions(stackid),
    Database.getUpcomingEditions(stackid)
  ]);
  return { hotTalks, justAddedEditions, recentEditions, upcomingEditions };
};

export default StackPage;
