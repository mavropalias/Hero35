import Layout from "../../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Container,
  Paper,
  Grid,
  Box
} from "@material-ui/core";
import { Talk } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import TalkList from "../../components/TalkList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(8)
    },
    paper: {
      marginBottom: theme.spacing(4)
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
    <Layout title={`Developer conference talks about ${topic}`}>
      <Paper className={classes.paper}>
        <Container className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box display="flex" alignItems="center">
                <Typography variant="h4">
                  Developer conference talks about {topic}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
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
