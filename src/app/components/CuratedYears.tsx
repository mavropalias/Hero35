import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Chip,
  Button
} from "@material-ui/core";
import { Flag as ItemIcon } from "@material-ui/icons";
import { default as NextLink } from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0, 2, 2, 0)
    }
  })
);

interface Props {
  className?: string;
}

const CuratedYears = ({ className }: Props) => {
  const classes = useStyles({});
  const items = ["2019", "2018", "2017", "2016", "2015"];

  return (
    <Container className={className}>
      <Typography variant="h5" component="h2">
        React annals
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        A record of React conferences, year by year.
      </Typography>
      {items.map(item => (
        <NextLink href={`/year/[yearid]`} as={`/year/${item}`} passHref>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            className={classes.chip}
          >
            {item}
          </Button>
        </NextLink>
      ))}
    </Container>
  );
};

export default CuratedYears;
