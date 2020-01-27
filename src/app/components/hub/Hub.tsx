import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import {
  TalkGroupContents,
  TalkBasic,
  EventEdition,
  HubContent
} from "../../schema";
import HubCover from "./HubCover";
import HubTalkGroup from "../TalkGroup";
import HubInterstitialTalk from "./HubInterstitialTalk";
import HubEditions from "./HubEditions";
import Welcome from "../Welcome";
import HubSection from "./HubSection";
import React from "react";
import TrackVisibility from "react-on-screen";
import { useStores } from "../../stores/useStores";
import { observer } from "mobx-react-lite";

interface Props {
  content: HubContent;
  color?: string;
  logo?: string;
  title?: string;
  showSavedTalks?: boolean;
}

const Hub = observer(
  ({ content, logo, title, color, showSavedTalks }: Props) => {
    const { userStore } = useStores();
    return (
      <>
        {content.coverTalks[0] && (
          <HubCover
            talk={content.coverTalks[0]}
            logo={logo}
            title={title}
            color={color}
          />
        )}
        <main style={{ position: "relative" }}>
          {showSavedTalks && <SavedTalks />}
          {content.editions && <HubEditions editions={content.editions} />}
          {content.talkGroups.slice(0, 1).map(group => (
            <HubSection key={group.title} content={group} />
          ))}
          {!userStore.isSignedIn && <Welcome />}
          {content.talkGroups.slice(1, 2).map(group => (
            <HubSection key={group.title} content={group} />
          ))}
          {content.coverTalks.length > 1 && (
            <Box marginBottom={8} component="section">
              <HubInterstitialTalk talk={content.coverTalks[1]} color={color} />
            </Box>
          )}
          <HubRepeat
            talkGroups={content.talkGroups.slice(2)}
            coverTalks={content.coverTalks.slice(2)}
            color={color}
          />
        </main>
      </>
    );
  }
);

const SavedTalks = observer(() => {
  const { userStore } = useStores();
  return (
    <>
      {userStore.isSignedIn && userStore.savedTalks.length > 0 && (
        <section>
          <Box marginBottom={8}>
            <HubTalkGroup
              talkGroup={{
                title: "My Saved Talks",
                talks: userStore.savedTalks
              }}
            />
          </Box>
        </section>
      )}
    </>
  );
});

const HubRepeat = ({
  talkGroups,
  coverTalks,
  color
}: {
  talkGroups: TalkGroupContents[];
  coverTalks: TalkBasic[];
  color?: string;
}) => {
  const renderContent = () => {
    let content = [];
    let coverTalkIndex = 0;
    for (let i = 0; i < talkGroups.length; i = i + 3) {
      const coverTalkIndexCopy = coverTalkIndex;
      content.push(
        <TrackVisibility partialVisibility once offset={900} key={i}>
          {({ isVisible }) =>
            isVisible && (
              <>
                {talkGroups.slice(i, i + 3).map(group => (
                  <HubSection key={group.title} content={group} />
                ))}
                {coverTalks[i] && (
                  <Box marginBottom={8} component="section">
                    <HubInterstitialTalk
                      talk={coverTalks[coverTalkIndexCopy]}
                      color={color}
                    />
                  </Box>
                )}
              </>
            )
          }
        </TrackVisibility>
      );
      coverTalkIndex++;
    }
    return content;
  };

  return <>{renderContent()}</>;
};

export default Hub;
