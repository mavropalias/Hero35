import Layout from "../components/Layout";
import theme from "../appTheme";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Container,
  Grid,
  Paper
} from "@material-ui/core";
import { Talk } from "../schema";
import Database from "../services/Database";
import { NextPage, NextPageContext } from "next";
import CuratedTalk from "../components/CuratedTalk";

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
  talks: Talk[];
}

const CuratedPage: NextPage<Props> = ({ talks }) => {
  const classes = useStyles({});

  let style = {
    background: `linear-gradient(35deg, ${theme.palette.background.paper} 0%, #444444 100%)`
  };

  return (
    <Layout
      title="Curated React conference talks"
      description="Must-watch React talks from developer conferences around the world, hand-picked by our editorial team."
    >
      <Paper className={classes.paper} style={style} square>
        <Container className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <Typography variant="h1">Curated React talks</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body1">
                Must-watch React talks from conferences around the world,
                hand-picked by our editorial team.
              </Typography>
              <Typography variant="caption" color="textSecondary" paragraph>
                The ingredients of a great conference talk, are: fascinating
                content and/or high educational value, captivating delivery, and
                clear audio quality.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
        <Grid container spacing={4}>
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
