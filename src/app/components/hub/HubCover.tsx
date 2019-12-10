import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { TalkBasic } from "../../schema";
import HubCoverImage from "./HubCoverImage";
import HubCoverText from "./HubCoverText";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      width: "100%",
      position: "relative",
      minHeight: `calc(85vh - 48px)`,
      display: "flex",
      alignItems: "center"
    }
  })
);

const HubCover = ({
  color,
  logo,
  talk,
  title
}: {
  color?: string;
  logo?: string;
  talk: TalkBasic;
  title?: string;
}) => {
  const classes = useStyles({});
  return (
    <header className={classes.header}>
      <HubCoverImage talk={talk} />
      <HubCoverText talk={talk} logo={logo} title={title} color={color} />
    </header>
  );
};

export default HubCover;
