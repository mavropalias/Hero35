import Layout from "../../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Container
} from "@material-ui/core";
import { EventEdition } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import EditionList from "../../components/EditionList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    }
  })
);

interface Props {
  year: string;
  editions: EventEdition[];
}

const YearPage: NextPage<Props> = ({ year, editions }) => {
  const classes = useStyles({});

  return (
    <Layout>
      <Container className={classes.container}>
        <Typography variant="h5" component="h1" paragraph>
          React developer conferences in {year}
        </Typography>
        <hr />
        {editions.length > 0 ? (
          <EditionList editions={editions} />
        ) : (
          <Typography variant="body1">
            No React developer conferences found in {year}.
          </Typography>
        )}
      </Container>
    </Layout>
  );
};

interface QueryProps {
  yearid: string;
}
YearPage.getInitialProps = async (ctx: NextPageContext) => {
  const { yearid: year } = (ctx.query as unknown) as QueryProps;
  const editions = await Database.getEditionsByYear(year);
  return { year, editions };
};

export default YearPage;
