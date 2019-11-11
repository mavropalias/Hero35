import { withStyles } from "@material-ui/styles";
import { Tooltip, Theme } from "@material-ui/core";

const DistinctiveTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

export default DistinctiveTooltip;
