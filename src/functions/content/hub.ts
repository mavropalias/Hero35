import * as functions from "firebase-functions";
import {
  getTalksCurated,
  getTalksHot,
  getTalksRising,
  getTalksTop,
  getTalksNew,
  getTalksByFilter
} from "./talks";
import util from "../util/util";
import { TALK_TYPE, HubContent } from "../schema";
import { getHotEditions } from "./editions";

/**
 * Get hub contents
 */
export const hub = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true, true);
  if (!approved) return response.send(null);
  const topic = request.query.topic;
  console.info(`hub-${topic ? topic : "home"}`);
  let hubContent: HubContent = null;
  if (!topic) {
    hubContent = await hubHome();
  } else if (topic === "react") {
    hubContent = await hubReact();
  } else if (topic === "javascript") {
    hubContent = await hubJavascript();
  } else {
    hubContent = await hubTopic(topic);
  }
  res.json(hubContent);
});

/**
 * Get hub contents for the home page
 */
const hubHome = async (): Promise<HubContent> => {
  const [
    curatedTalks,
    hotTalks,
    risingTalks,
    topTalks,
    newTalks,
    recentlyAddedTalks,
    keynotes,
    lightningTalks,
    panels,
    qaSessions,
    workshops,
    interviews,
    topicReact,
    topicJavascript,
    topicAccessibility,
    topicAnimation,
    topicArchitecture,
    topicCss,
    topicDesign,
    topicFunctionalProgramming,
    topicGraphql,
    topicMachineLearning,
    topicPerformance,
    topicProgressiveWebApps,
    topicReactNative,
    topicRedux,
    topicServerless,
    topicTesting,
    topicTypeScript,
    topicUserExperience
  ] = await Promise.all([
    getTalksCurated(),
    getTalksHot(),
    getTalksRising(),
    getTalksTop(),
    getTalksNew(),
    getTalksByFilter(null, null, TALK_TYPE.Talk),
    getTalksByFilter(null, null, TALK_TYPE.Keynote),
    getTalksByFilter(null, null, TALK_TYPE.LightningTalk),
    getTalksByFilter(null, null, TALK_TYPE.Panel),
    getTalksByFilter(null, null, TALK_TYPE.QA),
    getTalksByFilter(null, null, TALK_TYPE.Workshop),
    getTalksByFilter(null, null, TALK_TYPE.Interview),
    getTalksHot("react"),
    getTalksHot("javascript"),
    getTalksHot("accessibility"),
    getTalksHot("animation"),
    getTalksHot("architecture"),
    getTalksHot("css"),
    getTalksHot("design"),
    getTalksHot("functional-programming"),
    getTalksHot("graphql"),
    getTalksHot("machine-learning"),
    getTalksHot("performance"),
    getTalksHot("progressive-web-apps"),
    getTalksHot("react-native"),
    getTalksHot("redux"),
    getTalksHot("serverless"),
    getTalksHot("testing"),
    getTalksHot("typescript"),
    getTalksHot("user-experience")
  ]);
  const editions = await getHotEditions();
  const hubContent: HubContent = {
    editions,
    coverTalks: curatedTalks,
    talkGroups: [
      { title: "Hot talks", talks: hotTalks },
      { title: "Just added", talks: recentlyAddedTalks },
      { title: "React", talks: topicReact, slug: "react" },
      { title: "JavaScript", talks: topicJavascript, slug: "javascript" },
      { title: "All-time best", talks: topTalks },
      {
        title: "Architecture",
        talks: topicArchitecture,
        slug: "architecture"
      },
      { title: "CSS", talks: topicCss, slug: "css" },
      { title: "New talks", talks: newTalks },
      { title: "GraphQL", talks: topicGraphql, slug: "graphql" },
      { title: "Design", talks: topicDesign, slug: "design" },
      { title: "Rising in popularity", talks: risingTalks },
      {
        title: "How to make it fast & fluid",
        talks: topicPerformance,
        slug: "performance"
      },
      { title: "React Native", talks: topicReactNative, slug: "react-native" },
      { title: "Lightning talks", talks: lightningTalks },
      {
        title: "User Experience",
        talks: topicUserExperience,
        slug: "user-experience"
      },
      { title: "TypeScript", talks: topicTypeScript, slug: "typescript" },
      { title: "Keynotes", talks: keynotes },
      {
        title: "Machine Learning",
        talks: topicMachineLearning,
        slug: "machine-learning"
      },
      { title: "Curated talks", talks: curatedTalks },
      { title: "Redux", talks: topicRedux, slug: "redux" },
      { title: "Panel discussions", talks: panels },
      {
        title: "Accessibility",
        talks: topicAccessibility,
        slug: "accessibility"
      },
      { title: "Animation", talks: topicAnimation, slug: "animation" },
      { title: "Q&A sessions", talks: qaSessions },
      { title: "Serverless", talks: topicServerless, slug: "serverless" },
      {
        title: "Functional programming",
        talks: topicFunctionalProgramming,
        slug: "functional-programming"
      },
      { title: "Workshops", talks: workshops },
      { title: "Testing", talks: topicTesting, slug: "testing" },
      { title: "Interviews", talks: interviews },
      {
        title: "Progressive Web Apps",
        talks: topicProgressiveWebApps,
        slug: "progressive-web-apps"
      }
    ]
  };
  return hubContent;
};

/**
 * Get hub contents for a given topic
 */
const hubTopic = async topic => {
  const [
    curatedTalks,
    hotTalks,
    risingTalks,
    topTalks,
    newTalks,
    recentlyAddedTalks,
    keynotes,
    lightningTalks,
    panels,
    qaSessions,
    workshops,
    interviews
  ] = await Promise.all([
    getTalksCurated(topic),
    getTalksHot(topic),
    getTalksRising(topic),
    getTalksTop(topic),
    getTalksNew(topic),
    getTalksByFilter(topic, null, TALK_TYPE.Talk),
    getTalksByFilter(topic, null, TALK_TYPE.Keynote),
    getTalksByFilter(topic, null, TALK_TYPE.LightningTalk),
    getTalksByFilter(topic, null, TALK_TYPE.Panel),
    getTalksByFilter(topic, null, TALK_TYPE.QA),
    getTalksByFilter(topic, null, TALK_TYPE.Workshop),
    getTalksByFilter(topic, null, TALK_TYPE.Interview)
  ]);
  const hubContent: HubContent = {
    coverTalks: [...curatedTalks],
    talkGroups: []
  };
  hotTalks.length > 0 &&
    hubContent.talkGroups.push({ title: "Hot talks", talks: hotTalks });
  recentlyAddedTalks.length > 0 &&
    hubContent.talkGroups.push({
      title: "Just added",
      talks: recentlyAddedTalks
    });
  topTalks.length > 0 &&
    hubContent.talkGroups.push({ title: "All-time best", talks: topTalks });
  newTalks.length > 0 &&
    hubContent.talkGroups.push({ title: "New talks", talks: newTalks });
  curatedTalks.length > 0 &&
    hubContent.talkGroups.push({ title: "Curated talks", talks: curatedTalks });
  risingTalks.length > 0 &&
    hubContent.talkGroups.push({
      title: "Rising in popularity",
      talks: risingTalks
    });
  lightningTalks.length > 0 &&
    hubContent.talkGroups.push({
      title: "Lightning talks",
      talks: lightningTalks
    });
  keynotes.length > 0 &&
    hubContent.talkGroups.push({ title: "Keynotes", talks: keynotes });
  panels.length > 0 &&
    hubContent.talkGroups.push({ title: "Panel discussions", talks: panels });
  qaSessions.length > 0 &&
    hubContent.talkGroups.push({ title: "Q&A sessions", talks: qaSessions });
  workshops.length > 0 &&
    hubContent.talkGroups.push({ title: "Workshops", talks: workshops });
  interviews.length > 0 &&
    hubContent.talkGroups.push({ title: "Interviews", talks: interviews });

  if (hubContent.coverTalks.length < 4) {
    hubContent.coverTalks.push(...util.shuffleArray([...hotTalks.slice(0, 4)]));
  }
  if (hubContent.coverTalks.length < 4) {
    hubContent.coverTalks.push(
      ...util.shuffleArray([...recentlyAddedTalks.slice(0, 4)])
    );
  }
  return hubContent;
};

/**
 * Get hub contents for React
 */
const hubReact = async () => {
  const topic = "React";
  const topicSlug = "react";
  const [
    curatedTalks,
    hotTalks,
    risingTalks,
    topTalks,
    newTalks,
    recentlyAddedTalks,
    keynotes,
    lightningTalks,
    panels,
    qaSessions,
    workshops,
    interviews,
    topicAccessibility,
    topicAnimation,
    topicArchitecture,
    topicCss,
    topicDesign,
    topicFunctionalProgramming,
    topicGraphql,
    topicMachineLearning,
    topicPerformance,
    topicProgressiveWebApps,
    topicReactNative,
    topicRedux,
    topicServerless,
    topicTesting,
    topicTypeScript,
    topicUserExperience
  ] = await Promise.all([
    getTalksCurated(topicSlug),
    getTalksHot(topicSlug),
    getTalksRising(topicSlug),
    getTalksTop(topicSlug),
    getTalksNew(topicSlug),
    getTalksByFilter(topicSlug, null, TALK_TYPE.Talk),
    getTalksByFilter(topicSlug, null, TALK_TYPE.Keynote),
    getTalksByFilter(topicSlug, null, TALK_TYPE.LightningTalk),
    getTalksByFilter(topicSlug, null, TALK_TYPE.Panel),
    getTalksByFilter(topicSlug, null, TALK_TYPE.QA),
    getTalksByFilter(topicSlug, null, TALK_TYPE.Workshop),
    getTalksByFilter(topicSlug, null, TALK_TYPE.Interview),
    getTalksHot("accessibility"),
    getTalksHot("animation"),
    getTalksHot("architecture"),
    getTalksHot("css"),
    getTalksHot("design"),
    getTalksHot("functional-programming"),
    getTalksHot("graphql"),
    getTalksHot("machine-learning"),
    getTalksHot("performance"),
    getTalksHot("progressive-web-apps"),
    getTalksHot("react-native"),
    getTalksHot("redux"),
    getTalksHot("serverless"),
    getTalksHot("testing"),
    getTalksHot("typescript"),
    getTalksHot("user-experience")
  ]);
  const editions = await getHotEditions("4");
  const hubContent: HubContent = {
    editions,
    coverTalks: curatedTalks,
    talkGroups: [
      { title: `Hot ${topic} talks`, talks: hotTalks },
      { title: `Just added in ${topic}`, talks: recentlyAddedTalks },
      { title: `GraphQL + ${topic}`, talks: topicGraphql, slug: "graphql" },
      { title: "CSS", talks: topicCss, slug: "css" },
      { title: `All-time best in ${topic}`, talks: topTalks },
      {
        title: "Architecture",
        talks: topicArchitecture,
        slug: "architecture"
      },
      { title: "New talks", talks: newTalks },
      { title: "Design", talks: topicDesign, slug: "design" },
      { title: "Rising in popularity", talks: risingTalks },
      { title: "React Native", talks: topicReactNative, slug: "react-native" },
      {
        title: "How to make it fast & fluid",
        talks: topicPerformance,
        slug: "performance"
      },
      { title: "Lightning talks", talks: lightningTalks },
      {
        title: "User Experience",
        talks: topicUserExperience,
        slug: "user-experience"
      },
      { title: "TypeScript", talks: topicTypeScript, slug: "typescript" },
      { title: `${topic} Keynotes`, talks: keynotes },
      {
        title: "Machine Learning",
        talks: topicMachineLearning,
        slug: "machine-learning"
      },
      { title: `Curated ${topic} talks`, talks: curatedTalks },
      { title: "Animation", talks: topicAnimation, slug: "animation" },
      { title: `Redux + ${topic}`, talks: topicRedux, slug: "redux" },
      { title: "Panel discussions", talks: panels },
      {
        title: "Accessibility",
        talks: topicAccessibility,
        slug: "accessibility"
      },
      { title: "Q&A sessions", talks: qaSessions },
      { title: `Testing ${topic} apps`, talks: topicTesting, slug: "testing" },
      { title: "Serverless", talks: topicServerless, slug: "serverless" },
      {
        title: "Functional programming",
        talks: topicFunctionalProgramming,
        slug: "functional-programming"
      },
      { title: `${topic} Workshops`, talks: workshops },
      { title: "Interviews", talks: interviews },
      {
        title: "Progressive Web Apps",
        talks: topicProgressiveWebApps,
        slug: "progressive-web-apps"
      }
    ]
  };
  return hubContent;
};

/**
 * Get hub contents for JavaScript
 */
const hubJavascript = async () => {
  const topic = "JavaScript";
  const topicSlug = "javascript";
  const [
    curatedTalks,
    hotTalks,
    risingTalks,
    topTalks,
    newTalks,
    recentlyAddedTalks,
    keynotes,
    lightningTalks,
    panels,
    qaSessions,
    workshops,
    topicAccessibility,
    topicAnimation,
    topicArchitecture,
    topicCss,
    topicDesign,
    topicFunctionalProgramming,
    topicGraphql,
    topicMachineLearning,
    topicPerformance,
    topicProgressiveWebApps,
    topicReactNative,
    topicRedux,
    topicServerless,
    topicTesting,
    topicTypeScript,
    topicUserExperience
  ] = await Promise.all([
    getTalksCurated(topicSlug),
    getTalksHot(topicSlug),
    getTalksRising(topicSlug),
    getTalksTop(topicSlug),
    getTalksNew(topicSlug),
    getTalksByFilter(topicSlug, null, TALK_TYPE.Talk),
    getTalksByFilter(topicSlug, null, TALK_TYPE.Keynote),
    getTalksByFilter(topicSlug, null, TALK_TYPE.LightningTalk),
    getTalksByFilter(topicSlug, null, TALK_TYPE.Panel),
    getTalksByFilter(topicSlug, null, TALK_TYPE.QA),
    getTalksByFilter(topicSlug, null, TALK_TYPE.Workshop),
    getTalksHot("accessibility"),
    getTalksHot("animation"),
    getTalksHot("architecture"),
    getTalksHot("css"),
    getTalksHot("design"),
    getTalksHot("functional-programming"),
    getTalksHot("graphql"),
    getTalksHot("machine-learning"),
    getTalksHot("performance"),
    getTalksHot("progressive-web-apps"),
    getTalksHot("react-native"),
    getTalksHot("redux"),
    getTalksHot("serverless"),
    getTalksHot("testing"),
    getTalksHot("typescript"),
    getTalksHot("user-experience")
  ]);
  const editions = await getHotEditions("1");
  const hubContent: HubContent = {
    editions,
    coverTalks: curatedTalks,
    talkGroups: [
      { title: `Hot ${topic} talks`, talks: hotTalks },
      { title: `Just added in ${topic}`, talks: recentlyAddedTalks },
      { title: `GraphQL + ${topic}`, talks: topicGraphql, slug: "graphql" },
      { title: "CSS", talks: topicCss, slug: "css" },
      { title: `All-time best in ${topic}`, talks: topTalks },
      {
        title: "Architecture",
        talks: topicArchitecture,
        slug: "architecture"
      },
      { title: "New talks", talks: newTalks },
      { title: "Design", talks: topicDesign, slug: "design" },
      { title: "Rising in popularity", talks: risingTalks },
      { title: "React Native", talks: topicReactNative, slug: "react-native" },
      {
        title: "How to make it fast & fluid",
        talks: topicPerformance,
        slug: "performance"
      },
      { title: "Lightning talks", talks: lightningTalks },
      {
        title: "User Experience",
        talks: topicUserExperience,
        slug: "user-experience"
      },
      { title: "TypeScript", talks: topicTypeScript, slug: "typescript" },
      { title: `${topic} Keynotes`, talks: keynotes },
      {
        title: "Machine Learning",
        talks: topicMachineLearning,
        slug: "machine-learning"
      },
      { title: `Curated ${topic} talks`, talks: curatedTalks },
      { title: "Animation", talks: topicAnimation, slug: "animation" },
      { title: `Redux + ${topic}`, talks: topicRedux, slug: "redux" },
      { title: "Panel discussions", talks: panels },
      {
        title: "Accessibility",
        talks: topicAccessibility,
        slug: "accessibility"
      },
      { title: "Q&A sessions", talks: qaSessions },
      { title: `Testing ${topic} apps`, talks: topicTesting, slug: "testing" },
      { title: "Serverless", talks: topicServerless, slug: "serverless" },
      {
        title: "Functional programming",
        talks: topicFunctionalProgramming,
        slug: "functional-programming"
      },
      { title: `${topic} Workshops`, talks: workshops },
      {
        title: "Progressive Web Apps",
        talks: topicProgressiveWebApps,
        slug: "progressive-web-apps"
      }
    ]
  };
  return hubContent;
};
