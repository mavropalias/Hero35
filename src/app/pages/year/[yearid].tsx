import Layout from "../../components/Layout";
import NextLink from "next/link";
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
  const years = ["2020", "2019", "2018", "2017", "2016", "2015"];

  let style = {
    background: `linear-gradient(35deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.dark} 100%)`
  };

  return (
    <Layout
      title={`${year} React developer conferences`}
      description={`All React developer conferences for the year ${year}.`}
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
                {editions.length} React developer conferences in {year}
              </Typography>
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
        <Box marginTop={4} alignItems="center">
          <Typography variant="caption" color="textSecondary">
            More years:
          </Typography>
          {years.map(item => (
            <NextLink
              href={`/year/[yearid]`}
              as={`/year/${item}`}
              key={item}
              passHref
            >
              <Button size="small" color="primary" disabled={year === item}>
                {item}
              </Button>
            </NextLink>
          ))}
        </Box>
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
