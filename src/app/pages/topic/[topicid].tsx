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
import STACKS from "../../constants/stacks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(8)
    },
    paper: {
      marginBottom: theme.spacing(4)
    },
    stackLogo: {
      height: "128px",
      maxWidth: "100%"
    }
  })
);

interface Props {
  title: string;
  talks: Talk[];
}

const TopicDetails: NextPage<Props> = ({ title, talks }) => {
  const classes = useStyles({});
  const stack = STACKS.filter(stack => stack.slug === title)[0];
  if (stack) {
    title = stack.label;
  } else {
    title = title[0].toUpperCase() + title.slice(1).replace(/-/g, " ");
  }

  return (
    <Layout title={`Developer conference talks about ${title}`}>
      <Paper className={classes.paper}>
        <Container className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              {stack ? (
                <img
                  src={`/static/stacks/${stack.slug}.svg`}
                  className={classes.stackLogo}
                  alt={`${stack.label} logo`}
                  title={`${stack.label} conference talks`}
                />
              ) : (
                <Typography variant="h1">{title}</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="caption" color="textSecondary" paragraph>
                {talks.length} developer conference talks about {title}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
        {talks.length > 0 ? (
          <TalkList talks={talks} showEvent={true} />
        ) : (
          <Typography variant="body1">No talks found.</Typography>
        )}
      </Container>
    </Layout>
  );
};

interface QueryProps {
  topicid: string;
}
TopicDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { topicid: title } = (ctx.query as unknown) as QueryProps;
  const talks = await Database.getTalksByTopic(title);
  return { title, talks };
};

export default TopicDetails;
