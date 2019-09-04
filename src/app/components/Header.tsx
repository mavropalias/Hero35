import {
  AppBar,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Link,
  Box
} from "@material-ui/core";
import ROUTES from "../constants/routes";
import SearchInput from "./SearchInput";
import { default as NextLink } from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    logo: {
      maxHeight: "30px"
    },
    search: {
      maxWidth: "350px;"
    },
    menuLink: {
      margin: theme.spacing(1)
    }
  })
);

const Navigation = () => {
  const classes = useStyles({});

  return (
    <AppBar
      className={classes.appBar}
      position="sticky"
      color="default"
      elevation={0}
    >
      <Container>
        <Toolbar disableGutters={true}>
          <MenuLink href={ROUTES.HOME}>Home</MenuLink>
          <Box flexGrow="1">
            <SearchInput className={classes.search} />
          </Box>
          <img src="/static/HERO35-logo.svg" className={classes.logo} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const MenuLink = ({ href, children }) => {
  const classes = useStyles({});
  return (
    <NextLink href={href} passHref>
      <Link variant="button" className={classes.menuLink}>
        {children}
      </Link>
    </NextLink>
  );
};

export default Navigation;
