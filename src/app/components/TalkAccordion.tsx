import { useState, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { TalkPreview } from "../schema";
import TALK_TYPES from "../constants/talkTypes";
import TalkList from "./TalkList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    }
  })
);

interface Props {
  talks: TalkPreview[];
  className?: string;
}

const TalkAccordion = ({ talks, className }: Props) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [panels, setPanels] = useState([]);
  const classes = useStyles({});

  useEffect(() => {
    talks.forEach(talk => {
      if (!panels.includes(talk.type)) {
        setPanels([...panels, talk.type]);
      }
    });
    if (!expanded) setExpanded(panels[0]);
  });

  const panelName = (id: string) => {
    return TALK_TYPES.find(type => type.id === id).titlePlural;
  };

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={`${classes.root} ${className}`}>
      {panels.map(panel => (
        <ExpansionPanel
          key={panel}
          expanded={expanded === panel}
          onChange={handleChange(panel)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${panel}-content`}
            id={`panel${panel}-header`}
          >
            <Typography className={classes.heading}>
              {panelName(panel)}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TalkList talks={talks.filter(talk => talk.type === panel)} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default TalkAccordion;
