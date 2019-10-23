import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
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
  const tags = [
    "Accessibility",
    "Animation",
    "Architecture",
    "CSS",
    "Design-system",
    "GraphQL",
    "Hooks",
    "MobX",
    "Performance",
    "React-native",
    "Reason",
    "Redux",
    "Testing",
    "Typescript"
  ];

  return (
    <>
      <Typography variant="h5" component="h2">
        Hot React topics
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
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
            variant="outlined"
            icon={<TopicIcon />}
            className={classes.chip}
          />
        </NextLink>
      ))}
    </>
  );
};

export default CuratedTags;
