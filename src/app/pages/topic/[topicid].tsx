import Layout from "../../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Container
} from "@material-ui/core";
import { Talk } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import TalkList from "../../components/TalkList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    }
  })
);

interface Props {
  topic: string;
  talks: Talk[];
}

const TopicDetails: NextPage<Props> = ({ topic, talks }) => {
  const classes = useStyles({});

  return (
    <Layout>
      <Container className={classes.container}>
        <Typography variant="h5" component="h1" paragraph>
          Developer conference talks about {topic}
        </Typography>
        <hr />
        {talks.length > 0 ? (
          <TalkList talks={talks} showEvent={true} />
        ) : (
          <Typography variant="body1">
            No talks found for this topic.
          </Typography>
        )}
      </Container>
    </Layout>
  );
};

interface QueryProps {
  topicid: string;
}
TopicDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { topicid: topic } = (ctx.query as unknown) as QueryProps;
  const talks = await Database.getTalksByTopic(topic);
  return { topic, talks };
};

export default TopicDetails;
