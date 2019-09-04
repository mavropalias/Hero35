import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: blue
  },
  props: {
    MuiTextField: {
      variant: "outlined"
    },
    MuiButtonBase: {
      disableRipple: true
    },
    MuiStepButton: {
      style: {
        textAlign: "left"
      }
    }
  }
});

export default theme;
