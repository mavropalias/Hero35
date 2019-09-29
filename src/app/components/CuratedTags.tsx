import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Button,
  Chip
} from "@material-ui/core";
import { Whatshot as TopicIcon } from "@material-ui/icons";
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

const CuratedTags = ({ className }: Props) => {
  const classes = useStyles({});
  const tags = ["Hooks", "React-native", "GraphQL", "Performance", "Reason"];

  return (
    <Container className={className}>
      <Typography variant="h5" component="h2">
        Hot React topics
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        Stay up-to-date with the most important topics in React.
      </Typography>
      {tags.map(tag => (
        <NextLink
          key={tag}
          href={`/topic/[topicid]`}
          as={`/topic/${tag.toLowerCase()}`}
          passHref
        >
          <Chip
            component="a"
            color="primary"
            label={tag}
            icon={<TopicIcon />}
            className={classes.chip}
          />
        </NextLink>
      ))}
    </Container>
  );
};

export default CuratedTags;
