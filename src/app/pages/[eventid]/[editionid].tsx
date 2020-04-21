import Layout from "../../components/Layout";
import EditionTalks from "../../components/EditionTalks";
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Grid
} from "@material-ui/core";
import { EventEdition } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import Breadcrumbs from "../../components/Breadcrumbs";
import EditionHeader from "../../components/EditionHeader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    }
  })
);

interface Props {
  edition: EventEdition;
}

const EditionDetails: NextPage<Props> = ({ edition }) => {
  const classes = useStyles({});
  const breadcrumbs = [
    {
      path: edition.eventId,
      title: edition.eventTitle
    },
    {
      title: edition.title
    }
  ];
  const hasTalks = edition.talks?.length > 0;
  return (
    <Layout
      title={`${edition.eventTitle} ${edition.title}`}
      description={edition.description}
      keywords={`${edition.topTags &&
        edition.topTags.join(
          ","
        )},react event,react conference,developer conference`}
    >
      <Breadcrumbs items={breadcrumbs} />
      <Container className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={hasTalks ? 6 : 12}>
            <EditionHeader edition={edition} />
          </Grid>
          {hasTalks && (
            <Grid item xs={12} md={6}>
              <EditionTalks edition={edition} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

interface QueryProps {
  eventid: string;
  editionid: string;
}
EditionDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { eventid, editionid } = (ctx.query as unknown) as QueryProps;
  const edition = await Database.getEdition(eventid, editionid);
  return { edition };
};

export default EditionDetails;
