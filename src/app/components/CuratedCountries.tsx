import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Chip
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

const CuratedCountries = ({ className }: Props) => {
  const classes = useStyles({});
  const items = ["Czech Republic", "France", "Slovakia", "USA"];

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
          passHref
        >
          <Chip
            component="a"
            color="primary"
            label={item}
            icon={<ItemIcon />}
            className={classes.chip}
          />
        </NextLink>
      ))}
    </Container>
  );
};

export default CuratedCountries;
