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
  country: string;
  editions: EventEdition[];
}

const CountryPage: NextPage<Props> = ({ country, editions }) => {
  const classes = useStyles({});

  return (
    <Layout
      title={`React developer conferences in ${country}`}
      description={`All React conferences for developers in ${country}`}
      keywords={`${country},React conferences,developers,developer conference,React event,React in ${country}`}
    >
      <Container className={classes.container}>
        <Typography variant="h5" component="h1" paragraph>
          React developer conferences in {country}
        </Typography>
        <hr />
        {editions.length > 0 ? (
          <EditionList editions={editions} />
        ) : (
          <Typography variant="body1">
            No React developer conferences found in {country}.
          </Typography>
        )}
      </Container>
    </Layout>
  );
};

interface QueryProps {
  countryid: string;
}
CountryPage.getInitialProps = async (ctx: NextPageContext) => {
  const { countryid: country } = (ctx.query as unknown) as QueryProps;
  const editions = await Database.getEditionsByCountry(country);
  return { country, editions };
};

export default CountryPage;
