import {
  makeStyles,
  createStyles,
  Theme,
  Tabs,
  Tab,
  LinearProgress
} from "@material-ui/core";
import { useContext, useState, useEffect } from "react";
import CATEGORIES from "../constants/categories";
import { StackContext } from "./context-providers/StackContextProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      marginBottom: theme.spacing(2)
    }
  })
);

const StackTabs = ({
  fetch,
  isLoading,
  stateMark
}: {
  fetch: Function;
  isLoading: boolean;
  stateMark?: any;
}) => {
  const { state: stateStack } = useContext(StackContext);
  const [tab, setTab] = useState(stateStack.id);
  const classes = useStyles({});

  useEffect(() => {
    setTab(stateStack.id);
  }, [stateMark]);

  const handleChange = async (_: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue);
    fetch(newValue);
  };

  return (
    <>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        className={classes.tabs}
      >
        {CATEGORIES.map(cat => (
          <Tab key={cat.id} label={cat.title} value={cat.id} />
        ))}
      </Tabs>
      <LinearProgress style={isLoading ? {} : { visibility: "hidden" }} />
    </>
  );
};

export default StackTabs;
