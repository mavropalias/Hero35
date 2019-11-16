import { Hidden } from "@material-ui/core";
import { EventEdition } from "../schema";
import EditionList from "./EditionList";
import EditionGrid from "./EditionGrid";

interface Props {
  editions?: EventEdition[];
}

const RecentEditions = ({ editions }: Props) => (
  <>
    <Hidden xsDown>
      <EditionGrid editions={editions} hideTalkCount={true} />
    </Hidden>
    <Hidden smUp>
      <EditionList editions={editions} />
    </Hidden>
  </>
);
export default RecentEditions;
