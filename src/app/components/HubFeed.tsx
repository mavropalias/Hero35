import {
  useContext,
  useState,
  useRef,
  MutableRefObject,
  useEffect
} from "react";
import { StackContext } from "./context-providers/StackContextProvider";
import { Talk } from "../schema";
import {
  Tabs,
  Tab,
  makeStyles,
  Box,
  useMediaQuery,
  useTheme,
  LinearProgress
} from "@material-ui/core";
import {
  Whatshot as HotIcon,
  ArrowUpward as TopIcon,
  TrendingUp as RisingIcon,
  Today as RecentIcon,
  NewReleases as JustAddedIcon,
  Stars as CuratedIcon
} from "@material-ui/icons";
import TalkGrid from "./TalkGrid";
import Database from "../services/Database";

const HubFeed = ({
  className,
  hotTalks
}: {
  className?: string;
  hotTalks: Talk[];
}) => {
  const { state: stateStack } = useContext(StackContext);
  const [talks, setTalks] = useState(hotTalks);
  const [loading, setLoading] = useState(false);
  const talksHot = useRef<Talk[]>(hotTalks);
  const talksCurated = useRef<Talk[]>();
  const talksAdded = useRef<Talk[]>();
  const talksRising = useRef<Talk[]>();
  const talksRecent = useRef<Talk[]>();
  const talksTop = useRef<Talk[]>();
  const theme = useTheme();
  const showTabLabel = useMediaQuery(theme.breakpoints.up("sm"));
  const [tabValue, setTabValue] = useState(0);
  useEffect(() => {
    setTalks(hotTalks);
    setTabValue(0);
    talksCurated.current = null;
    talksAdded.current = null;
    talksRising.current = null;
    talksRecent.current = null;
    talksTop.current = null;
  }, [hotTalks]);
  type TalkType = "Added" | "Hot" | "Curated" | "Rising" | "Recent" | "Top";

  const tabs = [
    [<HotIcon fontSize="small" />, "Hot"],
    [<CuratedIcon fontSize="small" />, "Curated"],
    [<RecentIcon fontSize="small" />, "Recent"],
    [<TopIcon fontSize="small" />, "Top"],
    [<RisingIcon fontSize="small" />, "Rising"],
    [<JustAddedIcon fontSize="small" />, "Added", "Just added"]
  ];

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
    getTalks(tabs[newValue][1] as TalkType);
  };

  const getTalks = async (type: TalkType) => {
    let ref: MutableRefObject<Talk[]>;
    let talks;
    switch (type) {
      case "Added":
        ref = talksAdded;
        break;
      case "Curated":
        ref = talksCurated;
        break;
      case "Hot":
        ref = talksHot;
        break;
      case "Rising":
        ref = talksRising;
        break;
      case "Recent":
        ref = talksRecent;
        break;
      case "Top":
        ref = talksTop;
        break;
    }
    // Fetch talks, if not already set. Otherwise return the stored version.
    if (!ref.current) {
      try {
        setLoading(true);
        talks = await Database[`get${type}Talks`](stateStack.id);
        ref.current = talks;
        setLoading(false);
        setTalks(talks);
      } catch (e) {}
    } else {
      setTalks(ref.current);
    }
  };

  return (
    <main className={className}>
      <Box display="flex" flexDirection="column">
        <Box marginBottom={4}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={
                  <Box display="flex">
                    {tab[0]}
                    {(showTabLabel || tabValue === index) && (
                      <Box marginLeft={1}>{tab[2] || tab[1]}</Box>
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
        <LinearProgress style={loading ? {} : { visibility: "hidden" }} />
        <TalkGrid talks={talks} />
      </Box>
    </main>
  );
};

export default HubFeed;
