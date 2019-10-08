import { default as NextLink } from "next/link";
import Layout from "../../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Link,
  Chip,
  Container,
  Grid,
  Button,
  Box,
  Paper
} from "@material-ui/core";
import { Face as HeroIcon } from "@material-ui/icons";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Talk } from "../../schema";
import TalkList from "../../components/TalkList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(8)
    },
    paper: {
      marginBottom: theme.spacing(8)
    },
    heroIcon: {
      fontSize: theme.typography.fontSize * 8,
      marginRight: theme.spacing(4),
      marginBottom: theme.spacing(-8)
    },
    mainContainer: {
      marginTop: theme.spacing(2)
    }
  })
);

interface Props {
  talks: Talk[];
  name: string;
}

const HeroPage: NextPage<Props> = ({ talks, name }) => {
  const classes = useStyles({});

  return (
    <Layout
      title={`${name} conference talks`}
      description={`Developer conference talks by ${name}`}
      keywords={`${name},talks,conference speaker,react event,react conference,developer conference`}
    >
      <Paper className={classes.paper}>
        <Container className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box display="flex" alignItems="center">
                <HeroIcon className={classes.heroIcon} />
                <Typography variant="h4">{name}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container className={classes.mainContainer}>
        <Grid container spacing={4} justify="center">
          <Grid item xs={12} md={12}>
            <TalkList talks={talks} showEvent={true} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

interface QueryProps {
  heroid: string;
}
HeroPage.getInitialProps = async (ctx: NextPageContext) => {
  const { heroid: name } = (ctx.query as unknown) as QueryProps;
  const talks = await Database.getHeroTalks(name);
  return { talks, name };
};

export default HeroPage;
