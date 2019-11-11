import { Hidden } from "@material-ui/core";
import { EventEdition } from "../schema";
import EditionList from "./EditionList";
import EditionGrid from "./EditionGrid";

interface Props {
  editions?: EventEdition[];
}

const UpcomingEditions = ({ editions }: Props) => (
  <>
    <Hidden xsDown>
      <EditionGrid editions={editions} />
    </Hidden>
    <Hidden smUp>
      <EditionList editions={editions} />
    </Hidden>
  </>
);
export default UpcomingEditions;
