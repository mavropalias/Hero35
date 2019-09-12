import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Event } from "../schema";
import EditionList from "./EditionList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    talkAccordion: {
      marginTop: theme.spacing(2)
    }
  })
);

const EventEditions = ({ event }: { event?: Event }) => {
  const classes = useStyles({});

  const pastEditions = () => {
    const currentDate = new Date();
    return event.editions
      .filter(edition => {
        const editionDate = new Date(edition.endDate);
        if (editionDate.getTime() < currentDate.getTime()) return true;
        else return false;
      })
      .sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
  };

  const upcomingEditions = () => {
    const currentDate = new Date();
    return event.editions.filter(edition => {
      const editionDate = new Date(edition.endDate);
      if (editionDate.getTime() > currentDate.getTime()) return true;
      else return false;
    });
  };

  return (
    <>
      <EditionList
        label={`Upcoming ${event.title} events:`}
        editions={upcomingEditions()}
      />
      <EditionList
        label={`Past ${event.title} events:`}
        editions={pastEditions()}
      />
    </>
  );
};

export default EventEditions;
