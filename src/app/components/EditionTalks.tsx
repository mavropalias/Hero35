import { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme, Tabs, Tab } from "@material-ui/core";
import { EventEdition, Talk } from "../schema";
import TalkList from "./TalkList";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const EditionTalks = ({ edition }: { edition?: EventEdition }) => {
  const [selectedDay, setSelectedDay] = useState(edition.startDate);
  const [moreContent, setMoreContent] = useState(false);

  useEffect(() => {
    edition.talks.forEach(talk => {
      if (!["1", "2"].includes(talk.type)) {
        setMoreContent(true);
        return;
      }
      setMoreContent(false);
    });
  });

  const days = () => {
    const dates: string[] = [];
    if (edition) {
      const dateIterator = new Date(edition.startDate);
      const endDate = new Date(edition.endDate);
      while (dateIterator <= endDate) {
        const dateString = dateIterator.toISOString().slice(0, 10);
        dates.push(dateString);
        dateIterator.setDate(dateIterator.getDate() + 1);
      }
    }
    return dates;
  };

  const handleChange = (_: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedDay(newValue);
  };

  return (
    <>
      <Tabs
        value={selectedDay}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
      >
        {days().map((day, index) => (
          <Tab key={index} label={`Day ${index + 1} talks`} value={day} />
        ))}
        {moreContent && <Tab label="More content" value="99" />}
      </Tabs>
      <TalkList
        talks={edition.talks.filter(talk => {
          if (selectedDay !== "99")
            return talk.date == selectedDay && ["1", "2"].includes(talk.type);
          else return !["1", "2"].includes(talk.type);
        })}
      />
    </>
  );
};

export default EditionTalks;
