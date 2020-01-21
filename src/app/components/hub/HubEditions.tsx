import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Box
} from "@material-ui/core";
import { EventEdition } from "../../schema";
import EditionGroup from "../EditionGroup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(0, 0, 2, 2),
      color: theme.palette.text.secondary,
      lineHeight: 1,
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 0, 2, 3)
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 0, 3, 4)
      }
    }
  })
);

const HubEditions = ({ editions }: { editions: EventEdition[] }) => {
  const classes = useStyles({});
  return (
    <Box marginBottom={8} component="section">
      <Typography className={classes.title} variant="h4">
        Hot Conferences
      </Typography>
      <EditionGroup editions={editions} />
    </Box>
  );
};

export default HubEditions;
