import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { TalkBasic } from "../schema";
import TalkCoverImage from "./TalkCoverImage";
import TalkCoverText from "./TalkCoverText";

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

const TalkCover = ({
  color,
  logo,
  shouldLinkTitle = true,
  talk,
  title
}: {
  color?: string;
  logo?: string;
  shouldLinkTitle?: boolean;
  talk: TalkBasic;
  title?: string;
}) => {
  const classes = useStyles({});
  return (
    <header className={classes.header}>
      <TalkCoverImage talk={talk} />
      <TalkCoverText
        talk={talk}
        logo={logo}
        title={title}
        color={color}
        shouldLinkTitle={shouldLinkTitle}
      />
    </header>
  );
};

export default TalkCover;
