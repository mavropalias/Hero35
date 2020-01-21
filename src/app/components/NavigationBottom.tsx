import {
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
import { useState } from "react";
import { useStores } from "../stores/useStores";
import { observer } from "mobx-react-lite";

const NavigationBottom = observer(() => {
  const { userStore } = useStores();
  const [value, setValue] = useState(0);
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
              label={userStore.isSignedIn ? "Account" : "Sign in"}
              value={ROUTES.ACCOUNT}
              icon={<AccountIcon />}
            />
          </BottomNavigation>
        </AppBar>
      )}
    </>
  );
});

export default NavigationBottom;
