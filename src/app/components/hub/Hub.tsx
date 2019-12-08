import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import { TalkGroup, TalkBasic } from "../../schema";
import HubCover from "./HubCover";
import HubTalkGroup from "../HubTalkGroup";
import HubInterstitialTalk from "./HubInterstitialTalk";

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
          <Box marginBottom={8}>
            <HubInterstitialTalk talk={coverTalks[1]} color={color} />
          </Box>
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
          <Box marginBottom={8}>
            <HubInterstitialTalk talk={coverTalks[2]} color={color} />
          </Box>
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
