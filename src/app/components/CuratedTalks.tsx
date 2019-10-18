import { Grid, Typography, Link } from "@material-ui/core";
import { default as NextLink } from "next/link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NextPage } from "next";
import { Talk } from "../schema";
import CuratedTalk from "./CuratedTalk";

interface Props {
  talks?: Talk[];
  className?: string;
}

const CuratedTalks: NextPage<Props> = ({ talks, className }) => {
  const theme = useTheme();
  const talkCount = useMediaQuery(theme.breakpoints.only("sm")) ? 4 : 3;

  return (
    <section className={className}>
      <Typography variant="h5" component="h2">
        <NextLink href="/curated-conference-talks" passHref>
          <Link>Curated React talks</Link>
        </NextLink>
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Must-watch React talks from developer conferences around the world,
        hand-picked by our editorial team.
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
