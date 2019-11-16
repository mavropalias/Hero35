import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Button
} from "@material-ui/core";
import { default as NextLink } from "next/link";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      margin: theme.spacing(0, 1, 1, 0)
    }
  })
);

const CuratedYears = () => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});
  const items = ["2020", "2019", "2018", "2017", "2016", "2015"];

  return (
    <>
      {items.map(item => (
        <NextLink
          href={`/year/[yearid]${
            stateStack.slug ? `?stack=${stateStack.slug}` : ""
          }`}
          as={`/year/${item}${
            stateStack.slug ? `?stack=${stateStack.slug}` : ""
          }`}
          key={item}
          passHref
        >
          <Button size="small" color="primary" className={classes.item}>
            {item}
          </Button>
        </NextLink>
      ))}
    </>
  );
};

export default CuratedYears;
