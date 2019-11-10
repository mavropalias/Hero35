import { Grid } from "@material-ui/core";
import { NextPage } from "next";
import { Talk } from "../schema";
import TalkCard from "./TalkCard";

interface Props {
  talks?: Talk[];
  showCuration?: boolean;
}

const TalkGrid: NextPage<Props> = ({ talks, showCuration }) => (
  <Grid container spacing={3}>
    {talks.map(talk => (
      <Grid key={talk.id} item xs={12} sm={6} md={4}>
        <TalkCard talk={talk} showCuration={showCuration}></TalkCard>
      </Grid>
    ))}
  </Grid>
);

export default TalkGrid;
