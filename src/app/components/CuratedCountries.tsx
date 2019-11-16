import { createStyles, makeStyles, Theme, Button } from "@material-ui/core";
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
    }
  })
);

const CuratedCountries = () => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});

  return (
    <>
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
            size="small"
            title={`React developer conferences in ${item}`}
            color="primary"
            className={classes.item}
          >
            <ItemIcon className={classes.icon} /> {item}
          </Button>
        </NextLink>
      ))}
    </>
  );
};

export default CuratedCountries;
