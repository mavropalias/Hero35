import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  Hidden,
  Typography,
  Box
} from "@material-ui/core";
import { TalkPreview, EventEdition, TalkGroup, TalkBasic } from "../../schema";
import { useContext } from "react";
import { UserContext } from "./../context-providers/UserContextProvider";
import { StackContext } from "./../context-providers/StackContextProvider";
import HubCover from "./HubCover";
import HubTalkGroup from "../HubTalkGroup";
import HubInterstitialTalk from "./HubInterstitialTalk";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  color?: string;
  coverTalks?: TalkBasic[];
  logo?: string;
  talkGroups: TalkGroup[];
  title?: string;
}

const Hub = ({ coverTalks, talkGroups, logo, title, color }: Props) => {
  return (
    <>
      {coverTalks.length > 0 && (
        <HubCover
          talk={coverTalks[0]}
          logo={logo}
          title={title}
          color={color}
        />
      )}
      <main style={{ position: "relative" }}>
        {talkGroups.slice(0, 3).map(group => (
          <section key={group.title}>
            {group.talks && group.talks.length > 0 && (
              <Box marginBottom={8}>
                <HubTalkGroup key={group.title} talkGroup={group} />
              </Box>
            )}
          </section>
        ))}
        {coverTalks.length > 1 && (
          <HubInterstitialTalk talk={coverTalks[1]} color={color} />
        )}
        {talkGroups.slice(3, 6).map(group => (
          <section key={group.title}>
            {group.talks && group.talks.length > 0 && (
              <Box marginBottom={6}>
                <HubTalkGroup key={group.title} talkGroup={group} />
              </Box>
            )}
          </section>
        ))}
        {coverTalks.length > 2 && (
          <HubInterstitialTalk talk={coverTalks[2]} color={color} />
        )}
        {talkGroups.slice(6).map(group => (
          <section key={group.title}>
            {group.talks && group.talks.length > 0 && (
              <Box marginBottom={6}>
                <HubTalkGroup key={group.title} talkGroup={group} />
              </Box>
            )}
          </section>
        ))}
      </main>
    </>
  );
};

export default Hub;
