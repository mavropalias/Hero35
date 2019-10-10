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
  const classes = useStyles({});

  return (
    <Layout
      title={`React developer conferences in ${country}`}
      description={`All React conferences for developers in ${country}`}
      keywords={`${country},React conferences,developers,developer conference,React event,React in ${country}`}
    >
      <Paper className={classes.paper}>
        <Container className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box display="flex" alignItems="center">
                <Typography variant="h4">
                  React developer conferences in {country}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
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
