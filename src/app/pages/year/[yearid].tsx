import Layout from "../../components/Layout";
import theme from "../../appTheme";
import { Typography, Container, Box, Button, Divider } from "@material-ui/core";
import { EventEdition } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import CATEGORIES from "../../constants/categories";
import { useContext, useState, useEffect } from "react";
import { StackContext } from "../../components/context-providers/StackContextProvider";
import StackTabs from "../../components/StackTabs";
import LinkPrefetch from "../../components/LinkPrefetch";
import EditionGrid from "../../components/EditionGrid";

interface Props {
  year: string;
  editions: EventEdition[];
  justAddedEditions: EventEdition[];
}

const YearPage: NextPage<Props> = ({ year, editions, justAddedEditions }) => {
  const { state: stateStack } = useContext(StackContext);
  const [filteredEditions, setFilteredEditions] = useState(editions);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setFilteredEditions(editions);
  }, [editions]);

  const years = ["2020", "2019", "2018", "2017", "2016", "2015"];

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
      <Container>
        <Box marginTop={4} marginBottom={4} alignItems="center">
          <Typography variant="overline">Just added</Typography>
          <EditionGrid editions={justAddedEditions} variant="horizontal" />
        </Box>
      </Container>
      <Divider />
      <Container>
        <Box marginTop={2} marginBottom={2} alignItems="center">
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
              <Button size="large" color="primary" disabled={year === item}>
                {item}
              </Button>
            </LinkPrefetch>
          ))}
        </Box>
        <StackTabs fetch={fetchData} isLoading={isLoading} stateMark={year} />
        {filteredEditions.length > 0 ? (
          <EditionGrid editions={filteredEditions} />
        ) : (
          <Typography variant="body1">
            No {stateStack.contextTitle} developer conferences found in {year}.
          </Typography>
        )}
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
  const justAddedEditions = await Database.getJustAddedEditions(stackid);
  return { year, editions, justAddedEditions };
};

export default YearPage;
