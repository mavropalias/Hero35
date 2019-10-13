import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Hidden
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { EventEdition } from "../schema";
import EditionList from "./EditionList";
import EditionGrid from "./EditionGrid";

interface Props {
  editions?: EventEdition[];
  className?: string;
}

const RecentEditions = ({ editions, className }: Props) => {
  return (
    <>
      <Typography variant="h6" component="h2">
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
    </>
  );
};

export default RecentEditions;
