import Header from "./Header";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import appTheme from "../appTheme";

const Layout = props => (
  <>
    <Header />
    {props.children}
  </>
);

export default Layout;
