import Layout from "../../components/Layout";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Container,
  Paper,
  Grid,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  ListSubheader,
  LinearProgress
} from "@material-ui/core";
import { Talk } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import TalkList from "../../components/TalkList";
import STACKS from "../../constants/stacks";
import theme from "../../appTheme";
import { useState, useContext } from "react";
import CATEGORIES from "../../constants/categories";
import { StackContext } from "../../components/context-providers/StackContextProvider";
import StackTabs from "../../components/StackTabs";
import TalkGrid from "../../components/TalkGrid";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(8)
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    paper: {
      marginBottom: theme.spacing(4)
    },
    stackLogo: {
      height: "128px",
      maxWidth: "100%"
    },
    toolbar: theme.mixins.toolbar
  })
);

interface Props {
  title: string;
  talks: Talk[];
}

const TopicDetails: NextPage<Props> = ({ title, talks }) => {
  const { state: stateStack } = useContext(StackContext);
  const classes = useStyles({});
  const [filteredTalks, setFilteredTalks] = useState(talks);
  const [isLoading, setIsLoading] = useState();
  const stack = STACKS.filter(stack => stack.slug === title)[0];
  let style = {
    background: `linear-gradient(35deg, ${theme.palette.background.paper} 0%, ${
      stack ? stack.color : theme.palette.primary.dark
    } 100%)`
  };
  let titleParsed;
  if (stack) {
    titleParsed = stack.label;
  } else {
    titleParsed = title[0].toUpperCase() + title.slice(1).replace(/-/g, " ");
  }

  const fetchData = async (stackid: string) => {
    setIsLoading(true);
    const resTalks = await Database.getTalksByTopic(title, stackid);
    setFilteredTalks(resTalks);
    setIsLoading(false);
  };

  return (
    <Layout title={`Developer conference talks about ${titleParsed}`}>
      <Paper className={classes.paper} style={style} square>
        <Container className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              {stack ? (
                <img
                  src={`/stacks/${stack.slug}.svg`}
                  className={classes.stackLogo}
                  alt={`${stack.label} logo`}
                  title={`${stack.label} conference talks`}
                />
              ) : (
                <Typography variant="h1">{titleParsed}</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="caption" color="textSecondary" paragraph>
                {talks.length} developer conference talks about {titleParsed}
                {stateStack.slug && ` in ${stateStack.contextTitle}`}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
        <StackTabs fetch={fetchData} isLoading={isLoading} />
        {filteredTalks.length > 0 ? (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TalkGrid
                  talks={filteredTalks}
                  showTopics={false}
                  showVotes={false}
                />
              </Grid>
              {/* <Grid item xs={12} sm={4} md={3}>
                <Filters />
              </Grid> */}
            </Grid>
          </>
        ) : (
          <Box m={2}>
            <Typography variant="body1">No talks found.</Typography>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

// TODO this component is wip
const Filters = () => {
  const handleChangeYear = () => {};

  return (
    <List
      subheader={<ListSubheader component="div">Talk filters</ListSubheader>}
    >
      <ListItem>
        <FormControl component="fieldset">
          <Typography gutterBottom>
            <FormLabel component="legend">Types</FormLabel>
          </Typography>
          <RadioGroup
            aria-label="type"
            name="type"
            value={"All"}
            onChange={handleChangeYear}
          >
            <FormControlLabel value="All" control={<Radio />} label="All" />
            <FormControlLabel
              value="Regular talks"
              control={<Radio />}
              label="Regular talks"
            />
            <FormControlLabel
              value="Lightning talks"
              control={<Radio />}
              label="Lightning talks"
            />
          </RadioGroup>
        </FormControl>
      </ListItem>
      <Divider />
      <ListItem>
        <FormControl component="fieldset">
          <Typography gutterBottom>
            <FormLabel component="legend">Year</FormLabel>
          </Typography>
          <RadioGroup
            aria-label="year"
            name="year"
            value={"All"}
            onChange={handleChangeYear}
          >
            <Grid container>
              <Grid item xs>
                <FormControlLabel value="All" control={<Radio />} label="All" />
              </Grid>
              <Grid item xs>
                <FormControlLabel
                  value="2019"
                  control={<Radio />}
                  label="2019"
                />
              </Grid>
              <Grid item xs>
                <FormControlLabel
                  value="2018"
                  control={<Radio />}
                  label="2018"
                />
              </Grid>
              <Grid item xs>
                <FormControlLabel
                  value="2017"
                  control={<Radio />}
                  label="2017"
                />
              </Grid>
              <Grid item xs>
                <FormControlLabel
                  value="2016"
                  control={<Radio />}
                  label="2016"
                />
              </Grid>
              <Grid item xs>
                <FormControlLabel
                  value="2015"
                  control={<Radio />}
                  label="2015"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </ListItem>
    </List>
  );
};

interface QueryProps {
  topicid: string;
  stack?: string;
}
TopicDetails.getInitialProps = async (ctx: NextPageContext) => {
  const {
    topicid: title,
    stack: stackSlug
  } = (ctx.query as unknown) as QueryProps;
  const stack = CATEGORIES.find(cat => cat.slug === stackSlug);
  const stackid = stack ? stack.id : null;
  const talks = await Database.getTalksByTopic(title, stackid);
  return { title, talks };
};

export default TopicDetails;
