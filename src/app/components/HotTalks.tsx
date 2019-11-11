import { Hidden } from "@material-ui/core";
import { Talk } from "../schema";
import TalkGrid from "./TalkGrid";
import TalkList from "./TalkList";

interface Props {
  talks?: Talk[];
}

const HotTalks = ({ talks }: Props) => (
  <>
    <Hidden smDown>
      <TalkGrid talks={talks} />
    </Hidden>
    <Hidden mdUp>
      <TalkList talks={talks.slice(0, 6)} />
    </Hidden>
  </>
);
export default HotTalks;
