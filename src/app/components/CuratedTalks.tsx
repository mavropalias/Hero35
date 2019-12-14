import { Grid, Typography, Link } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NextPage } from "next";
import { Talk } from "../schema";
import CuratedTalk from "./CuratedTalk";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";
import LinkPrefetch from "./LinkPrefetch";

interface Props {
  talks?: Talk[];
  className?: string;
}

const CuratedTalks: NextPage<Props> = ({ talks, className }) => {
  const { state: stateStack } = useContext(StackContext);
  const theme = useTheme();
  const talkCount = useMediaQuery(theme.breakpoints.only("sm")) ? 4 : 3;

  return (
    <section className={className}>
      <Typography variant="h2">
        <LinkPrefetch
          href={`/curated-conference-talks${
            stateStack.slug ? `?stack=${stateStack.slug}` : ""
          }`}
          passHref
        >
          <Link>Curated {stateStack.contextTitle} talks</Link>
        </LinkPrefetch>
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Must-watch {stateStack.contextTitle} talks from developer conferences
        around the world, hand-picked by our editorial team.
      </Typography>
      <Grid container spacing={4}>
        {talks.slice(0, talkCount).map(talk => (
          <Grid key={talk.id} item xs={12} sm={6} md={4}>
            <CuratedTalk talk={talk} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default CuratedTalks;
