import Layout from "../../components/Layout";
import { HubContent } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import STACKS from "../../constants/stacks";
import Hub from "../../components/hub/Hub";

interface Props {
  title: string;
  content: HubContent;
}

const TopicDetails: NextPage<Props> = ({ title, content }) => {
  const stack = STACKS.filter(stack => stack.slug === title)[0];
  return (
    <Layout title={`Developer conference talks about ${title}`}>
      <Hub
        title={title}
        logo={stack?.slug && `/stacks/${stack?.slug}.svg`}
        color={stack?.color}
        content={content}
      />
    </Layout>
  );
};

interface QueryProps {
  topicid: string;
  stack?: string;
}
TopicDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { topicid: title } = (ctx.query as unknown) as QueryProps;
  const content: HubContent = await Database.getHub(title);
  return { title, content };
};

export default TopicDetails;
