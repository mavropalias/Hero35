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
    titleContainer: {
      margin: theme.spacing(0, 1, 2, 2),
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(0, 1, 2, 3)
      },
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(0, 1, 3, 4)
      }
    },
    title: {
      color: theme.palette.text.secondary,
      lineHeight: 1
    },
    subtitle: {
      display: "block",
      marginTop: theme.spacing(1)
    }
  })
);

const HubEditions = ({
  editions,
  showDate,
  showEditionTitle,
  title,
  subtitle
}: {
  editions: EventEdition[];
  showDate?: boolean;
  showEditionTitle?: boolean;
  title?: string;
  subtitle?: string;
}) => {
  const classes = useStyles({});
  return (
    <Box marginBottom={8} component="section">
      <div className={classes.titleContainer}>
        <Typography className={classes.title} variant="h4">
          {title}
        </Typography>
        {subtitle && (
          <Typography
            className={classes.subtitle}
            color="textSecondary"
            variant="caption"
          >
            {subtitle}
          </Typography>
        )}
      </div>
      <EditionGroup
        editions={editions}
        showDate={showDate}
        showEditionTitle={showEditionTitle}
      />
    </Box>
  );
};

export default HubEditions;
