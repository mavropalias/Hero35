import {
  createStyles,
  makeStyles,
  Theme,
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import ROUTES from "../constants/routes";
import Router from "next/router";
import {
  Dashboard as HomeIcon,
  AccountBox as AccountIcon,
  CardMembership as CuratedIcon
} from "@material-ui/icons/";
import { useContext, useState } from "react";
import { UserContext } from "./context-providers/UserContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alphaIcon: {
      marginLeft: theme.spacing(1)
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    logo: {
      maxHeight: "30px"
    },
    menuLink: {
      whiteSpace: "nowrap"
    },
    search: {
      maxWidth: "350px",
      margin: "0"
    }
  })
);

const NavigationBottom = () => {
  const { state, dispatch } = useContext(UserContext);
  const [value, setValue] = useState(0);
  const classes = useStyles({});
  const theme = useTheme();
  const showNav = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      {showNav && (
        <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              Router.push(newValue, newValue);
            }}
            showLabels
          >
            <BottomNavigationAction
              label="Home"
              value={ROUTES.HOME}
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="Curated"
              value={ROUTES.CURATED}
              icon={<CuratedIcon />}
            />
            <BottomNavigationAction
              label={state.signedIn ? "Account" : "Sign in"}
              value={ROUTES.ACCOUNT}
              icon={<AccountIcon />}
            />
          </BottomNavigation>
        </AppBar>
      )}
    </>
  );
};

export default NavigationBottom;
