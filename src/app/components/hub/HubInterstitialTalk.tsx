import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { TalkBasic } from "../../schema";
import HubInterstitialTalkText from "./HubInterstitialTalkText";
import HubInterstitialTalkImage from "./HubInterstitialTalkImage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    interstitial: {
      width: "100%",
      position: "relative"
    }
  })
);

const HubInterstitialTalk = ({
  talk,
  color
}: {
  talk: TalkBasic;
  color?: string;
}) => {
  const classes = useStyles({});
  return (
    <section className={classes.interstitial}>
      <HubInterstitialTalkImage talk={talk} />
      <HubInterstitialTalkText talk={talk} color={color} />
    </section>
  );
};

export default HubInterstitialTalk;
