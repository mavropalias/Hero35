import { Typography, Hidden } from "@material-ui/core";
import { EventEdition } from "../schema";
import EditionList from "./EditionList";
import EditionGrid from "./EditionGrid";

interface Props {
  editions?: EventEdition[];
  className?: string;
}

const RecentEditions = ({ editions, className }: Props) => {
  return (
    <section className={className}>
      <Typography variant="h5" component="h2">
        Recent React conferences
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        View talks, workshops, and more from the most recent React developer
        conferences.
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
