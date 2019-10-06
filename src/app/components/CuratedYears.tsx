import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Button
} from "@material-ui/core";
import { default as NextLink } from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      margin: theme.spacing(0, 1, 1, 0)
    }
  })
);

const CuratedYears = () => {
  const classes = useStyles({});
  const items = ["2020", "2019", "2018", "2017", "2016", "2015"];

  return (
    <>
      <Typography variant="h6" component="h2">
        React annals
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        A record of React conferences, year by year.
      </Typography>
      {items.map(item => (
        <NextLink
          href={`/year/[yearid]`}
          as={`/year/${item}`}
          key={item}
          passHref
        >
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.item}
          >
            {item}
          </Button>
        </NextLink>
      ))}
    </>
  );
};

export default CuratedYears;
