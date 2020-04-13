import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
  Button
} from "@material-ui/core";
import { useStores } from "../stores/useStores";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    default: {
      maxWidth: theme.breakpoints.values.sm,
      maxHeight: "4.5em",
      overflow: "hidden"
    },
    expanded: {
      maxWidth: theme.breakpoints.values.sm,
      whiteSpace: "pre-line"
    },
    expandButton: {
      color: theme.palette.text.secondary,
      padding: 0,
      marginTop: theme.spacing(0.5)
    }
  })
);

const TextExpander = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles({});

  return (
    <>
      <div className={expanded ? classes.expanded : classes.default}>
        {text}
      </div>
      {!expanded && (
        <Button
          variant="text"
          className={classes.expandButton}
          onClick={_ => setExpanded(true)}
        >
          Show more
        </Button>
      )}
    </>
  );
};

export default TextExpander;
