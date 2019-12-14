import Layout from "../../components/Layout";
import theme from "../../appTheme";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Container,
  Paper,
  Grid,
  Box,
  Button
} from "@material-ui/core";
import { EventEdition } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import EditionList from "../../components/EditionList";
import CATEGORIES from "../../constants/categories";
import { useContext, useState, useEffect } from "react";
import { StackContext } from "../../components/context-providers/StackContextProvider";
import StackTabs from "../../components/StackTabs";
import LinkPrefetch from "../../components/LinkPrefetch";

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
  year: string;
  editions: EventEdition[];
}

const YearPage: NextPage<Props> = ({ year, editions }) => {
  const { state: stateStack } = useContext(StackContext);
  const [filteredEditions, setFilteredEditions] = useState(editions);
  const [isLoading, setIsLoading] = useState();
  const classes = useStyles({});

  useEffect(() => {
    setFilteredEditions(editions);
  }, [editions]);

  const years = ["2020", "2019", "2018", "2017", "2016", "2015"];
  let style = {
    background: `linear-gradient(35deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.dark} 100%)`
  };

  const fetchData = async (stackid: string) => {
    setIsLoading(true);
    const resEditions = await Database.getEditionsByYear(year, stackid);
    setFilteredEditions(resEditions);
    setIsLoading(false);
  };

  return (
    <Layout
      title={`${year} ${stateStack.contextTitle} developer conferences`}
      description={`All ${stateStack.contextTitle} developer conferences for the year ${year}.`}
      keywords={`${year},conferences,developer conference,year ${year},developers,event`}
    >
      <Paper className={classes.paper} style={style} square>
        <Container className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <Typography variant="h1">{year}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="caption" color="textSecondary" paragraph>
                {editions.length} {stateStack.contextTitle} developer
                conferences in {year}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
        <StackTabs fetch={fetchData} isLoading={isLoading} stateMark={year} />
        {filteredEditions.length > 0 ? (
          <EditionList editions={filteredEditions} />
        ) : (
          <Typography variant="body1">
            No {stateStack.contextTitle} developer conferences found in {year}.
          </Typography>
        )}
        <Box marginTop={4} alignItems="center">
          <Typography variant="caption" color="textSecondary">
            More years:
          </Typography>
          {years.map(item => (
            <LinkPrefetch
              href={`/year/[yearid]${
                stateStack.slug ? `?stack=${stateStack.slug}` : ""
              }`}
              as={`/year/${item}${
                stateStack.slug ? `?stack=${stateStack.slug}` : ""
              }`}
              key={item}
              passHref
            >
              <Button size="small" color="primary" disabled={year === item}>
                {item}
              </Button>
            </LinkPrefetch>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

interface QueryProps {
  yearid: string;
  stack: string;
}
YearPage.getInitialProps = async (ctx: NextPageContext) => {
  const { yearid: year, stack } = (ctx.query as unknown) as QueryProps;
  const stackid = stack ? CATEGORIES.find(cat => cat.slug === stack).id : null;
  const editions = await Database.getEditionsByYear(year, stackid);
  return { year, editions };
};

export default YearPage;
