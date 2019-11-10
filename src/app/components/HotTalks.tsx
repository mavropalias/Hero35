import { Typography, Hidden } from "@material-ui/core";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";
import { Talk } from "../schema";
import TalkGrid from "./TalkGrid";
import TalkList from "./TalkList";

interface Props {
  talks?: Talk[];
  className?: string;
}

const HotTalks = ({ talks, className }: Props) => {
  const { state: stateStack } = useContext(StackContext);

  return (
    <section className={className}>
      <Typography variant="h2" component="h2">
        Hot {stateStack.contextTitle} talks
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Talks that are popular in the community, right now.
      </Typography>
      <Hidden smDown>
        <TalkGrid talks={talks} />
      </Hidden>
      <Hidden mdUp>
        <TalkList talks={talks.slice(0, 6)} />
      </Hidden>
    </section>
  );
};

export default HotTalks;
