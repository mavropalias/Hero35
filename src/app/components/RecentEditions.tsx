import { Typography, Hidden } from "@material-ui/core";
import { EventEdition } from "../schema";
import EditionList from "./EditionList";
import EditionGrid from "./EditionGrid";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";

interface Props {
  editions?: EventEdition[];
  className?: string;
}

const RecentEditions = ({ editions, className }: Props) => {
  const { state: stateStack } = useContext(StackContext);

  return (
    <section className={className}>
      <Typography variant="h2">
        Recent {stateStack.contextTitle} conferences
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        View talks, workshops, and more from the most recent{" "}
        {stateStack.contextTitle} developer conferences.
      </Typography>
      <Hidden smDown>
        <EditionGrid editions={editions} />
      </Hidden>
      <Hidden mdUp>
        <EditionList editions={editions} />
      </Hidden>
    </section>
  );
};

export default RecentEditions;
