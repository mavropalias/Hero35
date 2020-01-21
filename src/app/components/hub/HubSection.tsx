import { Box } from "@material-ui/core";
import { TalkGroupContents } from "../../schema";
import TalkGroup from "../TalkGroup";

interface Props {
  content: TalkGroupContents;
}

const HubSection = ({ content }: Props) => {
  return (
    <Box marginBottom={8} component="section">
      <TalkGroup talkGroup={content} />
    </Box>
  );
};

export default HubSection;
