import theme from "../../appTheme";
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
import { EventEdition } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import EditionList from "../../components/EditionList";
import CATEGORIES from "../../constants/categories";
import { useContext, useState, useEffect } from "react";
import { StackContext } from "../../components/context-providers/StackContextProvider";
import StackTabs from "../../components/StackTabs";

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
  country: string;
  editions: EventEdition[];
}

const CountryPage: NextPage<Props> = ({ country, editions }) => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});
  const [filteredEditions, setFilteredEditions] = useState(editions);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setFilteredEditions(editions);
  }, [editions]);

  let style = {
    background: `linear-gradient(35deg, ${theme.palette.background.paper} 0%,${theme.palette.primary.dark}  100%)`
  };

  const fetchData = async (stackid: string) => {
    setIsLoading(true);
    const resEditions = await Database.getEditionsByCountry(country, stackid);
    setFilteredEditions(resEditions);
    setIsLoading(false);
  };

  return (
    <Layout
      title={`${stateStack.contextTitle} developer conferences in ${country}`}
      description={`${stateStack.contextTitle} conferences for developers in ${country}`}
      keywords={`${country},${stateStack.contextTitle} conferences,developers,developer conference,${stateStack.contextTitle} event,${stateStack.contextTitle} in ${country}`}
    >
      <Paper className={classes.paper} style={style} square>
        <Container className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <Typography variant="h1">{country}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="caption" color="textSecondary" paragraph>
                {stateStack.contextTitle} developer conferences in {country}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
        <StackTabs fetch={fetchData} isLoading={isLoading} />
        {filteredEditions.length > 0 ? (
          <EditionList editions={filteredEditions} />
        ) : (
          <Box m={2}>
            <Typography variant="body1">No conferences found</Typography>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

interface QueryProps {
  countryid: string;
  stack: string;
}
CountryPage.getInitialProps = async (ctx: NextPageContext) => {
  const { countryid: country, stack } = (ctx.query as unknown) as QueryProps;
  const stackid = stack ? CATEGORIES.find(cat => cat.slug === stack).id : null;
  const editions = await Database.getEditionsByCountry(country, stackid);
  return { country, editions };
};

export default CountryPage;
