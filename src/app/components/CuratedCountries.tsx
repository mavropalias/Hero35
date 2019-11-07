import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Button
} from "@material-ui/core";
import { Flag as ItemIcon } from "@material-ui/icons";
import { default as NextLink } from "next/link";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";
import CATEGORIES from "../constants/categories";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(1)
    },
    item: {
      margin: theme.spacing(0, 1, 1, 0)
    },
    title: {
      "&::first-letter": {
        textTransform: "uppercase"
      }
    }
  })
);

const CuratedCountries = ({ className }) => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});

  return (
    <section className={className}>
      <Typography variant="h2" className={classes.title}>
        {stateStack.contextTitle} conferences around the world
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        These countries are {stateStack.contextTitle} conference hotspots.
      </Typography>
      {CATEGORIES.find(cat => cat.id === stateStack.id).countries.map(item => (
        <NextLink
          href={`/country/[countryid]${
            stateStack.slug ? `?stack=${stateStack.slug}` : ""
          }`}
          as={`/country/${item}${
            stateStack.slug ? `?stack=${stateStack.slug}` : ""
          }`}
          key={item}
          passHref
        >
          <Button
            variant="outlined"
            size="large"
            title={`React developer conferences in ${item}`}
            color="primary"
            className={classes.item}
          >
            <ItemIcon className={classes.icon} /> {item}
          </Button>
        </NextLink>
      ))}
    </section>
  );
};

export default CuratedCountries;
