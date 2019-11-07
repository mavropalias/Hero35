import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Chip
} from "@material-ui/core";
import { Whatshot as TopicIcon } from "@material-ui/icons";
import { default as NextLink } from "next/link";
import { useContext } from "react";
import { StackContext } from "./context-providers/StackContextProvider";

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
  const { state: stateStack } = useContext(StackContext);
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
    <section className={className}>
      <Typography variant="h2">Hot {stateStack.contextTitle} topics</Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Stay up-to-date with the most important topics in{" "}
        {stateStack.contextTitle !== ""
          ? stateStack.contextTitle
          : stateStack.title.toLocaleLowerCase()}
        .
      </Typography>
      {tags.map(tag => (
        <NextLink
          key={tag}
          href={`/topic/[topicid]?stack=${
            stateStack.slug ? stateStack.slug : "all"
          }`}
          as={`/topic/${tag.toLowerCase()}?stack=${
            stateStack.slug ? stateStack.slug : "all"
          }`}
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
    </section>
  );
};

export default CuratedTags;
