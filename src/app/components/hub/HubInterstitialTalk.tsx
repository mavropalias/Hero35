import { makeStyles, createStyles, Theme, Divider } from "@material-ui/core";
import { TalkBasic } from "../../schema";
import HubInterstitialTalkText from "./HubInterstitialTalkText";
import HubInterstitialTalkImage from "./HubInterstitialTalkImage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    interstitial: {
      width: "100%",
      position: "relative",
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`
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
