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
  year: string;
  editions: EventEdition[];
}

const YearPage: NextPage<Props> = ({ year, editions }) => {
  const classes = useStyles({});

  return (
    <Layout
      title={`${year} React developer conferences`}
      description={`All React developer conferences for the year ${year}.`}
      keywords={`${year},conferences,developer conference,year ${year},developers,event`}
    >
      <Paper className={classes.paper}>
        <Container className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box display="flex" alignItems="center">
                <Typography variant="h4">
                  React developer conferences in {year}
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
