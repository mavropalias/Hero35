import Layout from "../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Container,
  Grid
} from "@material-ui/core";
import { Talk } from "../schema";
import Database from "../services/Database";
import { NextPage, NextPageContext } from "next";
import CuratedTalk from "../components/CuratedTalk";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    }
  })
);

interface Props {
  talks: Talk[];
}

const CuratedPage: NextPage<Props> = ({ talks }) => {
  const classes = useStyles({});

  return (
    <Layout>
      <Container className={classes.container}>
        <Typography variant="h5" component="h1">
          Curated React talks
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Must-watch React talks from developer conferences around the world,
          hand-picked by our editorial team.
        </Typography>
        <Grid container spacing={2}>
          {talks.map(talk => (
            <Grid key={talk.id} item xs={12} sm={6} md={4}>
              <CuratedTalk talk={talk} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

CuratedPage.getInitialProps = async (ctx: NextPageContext) => {
  const talks = await Database.getCuratedTalks(20);
  return { talks };
};

export default CuratedPage;
