import Layout from "../../../components/Layout";
import { Box, Divider } from "@material-ui/core";
import { Talk, TalkGroupContents } from "../../../schema";
import Database from "../../../services/Database";
import { NextPage, NextPageContext } from "next";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useState, useEffect } from "react";
import TalkGroup from "../../../components/TalkGroup";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../stores/useStores";
import TalkCover from "../../../components/TalkCover";
import TalkVideo from "../../../components/talk/TalkVideo";
import TalkInfo from "../../../components/talk/TalkInfo";

interface Props {
  talk: Talk;
}

const TalkPage: NextPage<Props> = observer(({ talk }) => {
  const { userStore } = useStores();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (userStore.shouldAutoPlayNextTalk) {
      setPlay(true);
      userStore.setShouldAutoPlayNextTalk(false);
    }
  }, [userStore.shouldAutoPlayNextTalk]);

  const savedTalksGroup: TalkGroupContents = {
    title: "My saved talks",
    talks: userStore.savedTalks
  };

  const breadcrumbs = [
    {
      path: talk.eventId,
      title: talk.eventTitle
    },
    {
      path: `${talk.eventId}/${talk.editionId}`,
      title: talk.editionTitle
    },
    {
      title: talk.title
    }
  ];

  return (
    <Layout
      title={`${talk.title} - ${talk.speaker} - ${talk.eventTitle} ${talk.editionTitle}`}
      description={talk.curationDescription || talk.description}
      keywords={talk.tags.join(",")}
      image={`https://i.ytimg.com/vi/${talk.youtubeId ||
        talk.id}/hqdefault.jpg`}
    >
      <Breadcrumbs items={breadcrumbs} />
      {!play ? (
        <TalkCover talk={talk} shouldLinkTitle={false} />
      ) : (
        <TalkVideo
          videoid={talk.youtubeId || talk.id}
          start={talk.start}
          end={talk.end}
        />
      )}
      <main style={{ position: "relative" }}>
        <TalkInfo talk={talk} showHeader={play} />
        {savedTalksGroup.talks?.length > 0 && (
          <>
            <TalkDivider />
            <TalkGroup talkGroup={savedTalksGroup} />
          </>
        )}
      </main>
    </Layout>
  );
});

const TalkDivider = () => (
  <Box marginBottom={4} marginTop={4}>
    <Divider />
  </Box>
);

interface QueryProps {
  eventid: string;
  editionid: string;
  talkslug: string;
}
TalkPage.getInitialProps = async (ctx: NextPageContext) => {
  const { eventid, editionid, talkslug } = (ctx.query as unknown) as QueryProps;
  const talk = await Database.getTalk(eventid, editionid, talkslug);
  return { talk };
};

export default TalkPage;
