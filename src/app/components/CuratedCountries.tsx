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
    icon: {
      marginRight: theme.spacing(1)
    },
    item: {
      margin: theme.spacing(0, 1, 1, 0)
    }
  })
);

interface Props {
  className?: string;
}

const CuratedCountries = ({ className }: Props) => {
  const classes = useStyles({});
  const items = [
    "Czech Republic",
    "France",
    "Israel",
    "Netherlands",
    "Poland",
    "Slovakia",
    "UK",
    "USA"
  ];

  return (
    <Container className={className}>
      <Typography variant="h5" component="h2">
        React conferences around the world
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        These countries are React conference hotspots.
      </Typography>
      {items.map(item => (
        <NextLink
          href={`/country/[countryid]`}
          as={`/country/${item}`}
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
    </Container>
  );
};

export default CuratedCountries;
