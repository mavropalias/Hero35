import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#00AEFF"
      },
      secondary: {
        main: "#FFD14A"
      },
      background: {
        paper: "#191919",
        default: "#121212"
      }
    },
    props: {
      MuiTextField: {
        variant: "outlined"
      },
      MuiTab: {
        style: {
          minWidth: "135px"
        }
      }
    },
    typography: {
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
      h5: {
        fontWeight: 700
      },
      h6: {
        fontWeight: 700
      }
    }
  })
);

export default theme;
