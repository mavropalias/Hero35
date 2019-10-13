const stackLabels = [
  "Apollo",
  "AWS",
  "Babel",
  "CSS",
  "D3",
  "Elm",
  "Functional Programming",
  "Gatsby",
  "GraphQL",
  "Jest",
  "MobX",
  "NextJS",
  "NPM",
  "Redux",
  "React Native",
  "Reason",
  "RxJS",
  "Serverless",
  "Storybook",
  "TypeScript",
  "WebAssembly",
  "Webpack"
];

type Stack = {
  label: string;
  slug: string;
};
const STACKS: Stack[] = stackLabels.map(stack => {
  return {
    label: stack,
    slug: stack.toLowerCase().replace(/ /g, "-")
  };
});

export default STACKS;
