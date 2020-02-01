import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { EventEdition } from "../../schema";
import EditionCoverMedia from "./EditionCoverMedia";
import EditionCoverText from "./EditionCoverText";

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

const EditionCover = ({
  edition,
  shouldLinkTitle = true
}: {
  edition: EventEdition;
  shouldLinkTitle?: boolean;
}) => {
  const classes = useStyles({});
  return (
    <header className={classes.header}>
      <EditionCoverMedia edition={edition} />
      <EditionCoverText edition={edition} />
    </header>
  );
};

export default EditionCover;
