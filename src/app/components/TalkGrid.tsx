import { Grid } from "@material-ui/core";
import { NextPage } from "next";
import { TalkBasic } from "../schema";
import TalkCard from "./TalkCard";
import CuratorCard from "./CuratorCard";

interface Props {
  talks?: TalkBasic[];
  showCuration?: boolean;
  showTopics?: boolean;
  showSaveButton?: boolean;
}

const TalkGrid: NextPage<Props> = ({
  talks,
  showCuration,
  showTopics = true,
  showSaveButton = true
}) => (
  <Grid container spacing={3}>
    {showCuration && (
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <CuratorCard />
      </Grid>
    )}
    {talks.map(talk => (
      <Grid key={talk.id} item xs={12} sm={6} md={6} lg={4} xl={4}>
        <TalkCard
          talk={talk}
          showCuration={showCuration}
          showTopics={showTopics}
          showSaveButton={showSaveButton}
        ></TalkCard>
      </Grid>
    ))}
  </Grid>
);

export default TalkGrid;
