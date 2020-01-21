import { HubContent } from "../schema";
import Database from "../services/Database";
import { NextPage } from "next";
import Hub from "../components/hub/Hub";
import Layout from "../components/Layout";

interface Props {
  hubContent: HubContent;
}

const Home: NextPage<Props> = ({ hubContent }) => (
  <Layout>
    <Hub content={hubContent} showSavedTalks={true} />
  </Layout>
);

Home.getInitialProps = async () => {
  const hubContent = await Database.getHub();
  return {
    hubContent
  };
};

export default Home;
