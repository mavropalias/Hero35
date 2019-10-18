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
  ListSubheader
} from "@material-ui/core";
import { Talk } from "../../schema";
import Database from "../../services/Database";
import { NextPage, NextPageContext } from "next";
import TalkList from "../../components/TalkList";
import STACKS from "../../constants/stacks";
import theme from "../../appTheme";
import { useState } from "react";

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
    tabs: {
      marginBottom: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar
  })
);

interface Props {
  title: string;
  talks: Talk[];
}

const TopicDetails: NextPage<Props> = ({ title, talks }) => {
  const classes = useStyles({});
  const [tab, setTab] = useState("recent");
  const [filteredTalks, setFilteredTalks] = useState(talks);
  const stack = STACKS.filter(stack => stack.slug === title)[0];
  let style = {
    background: `linear-gradient(35deg, ${theme.palette.background.paper} 0%, ${
      stack ? stack.color : "#444444"
    } 100%)`
  };
  if (stack) {
    title = stack.label;
  } else {
    title = title[0].toUpperCase() + title.slice(1).replace(/-/g, " ");
  }

  const handleChange = async (_: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue);
    fetchTalks(newValue);
  };

  const fetchTalks = async (filter: string) => {
    switch (filter) {
      case "recent":
        setFilteredTalks(talks);
        break;
      case "curated":
        setFilteredTalks(
          await Database.getTalksByFilter(stack ? stack.slug : title, true)
        );
        break;
      case "longest":
        setFilteredTalks(
          await Database.getTalksByFilter(
            stack ? stack.slug : title,
            false,
            2,
            "times.totalMins",
            "desc"
          )
        );
        break;
      case "shortest":
        setFilteredTalks(
          await Database.getTalksByFilter(
            stack ? stack.slug : title,
            false,
            2,
            "times.totalMins",
            "asc"
          )
        );
        break;
    }
  };

  return (
    <Layout title={`Developer conference talks about ${title}`}>
      <Paper className={classes.paper} style={style} square>
        <Container className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              {stack ? (
                <img
                  src={`/static/stacks/${stack.slug}.svg`}
                  className={classes.stackLogo}
                  alt={`${stack.label} logo`}
                  title={`${stack.label} conference talks`}
                />
              ) : (
                <Typography variant="h1">{title}</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="caption" color="textSecondary" paragraph>
                {talks.length} developer conference talks about {title}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container>
        {talks.length > 0 ? (
          <>
            {/* <TalkTabs handleChange={handleChange} tab={tab} /> */}
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper>
                  <TalkList talks={filteredTalks} showEvent={true} />
                </Paper>
              </Grid>
              {/* <Grid item xs={12} sm={4} md={3}>
                <Filters />
              </Grid> */}
            </Grid>
          </>
        ) : (
          <Typography variant="body1">No talks found.</Typography>
        )}
      </Container>
    </Layout>
  );
};

const TalkTabs = ({ tab, handleChange }) => {
  const classes = useStyles({});

  return (
    <Tabs
      value={tab}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      onChange={handleChange}
      className={classes.tabs}
    >
      <Tab label="Recent" value="recent" />
      <Tab label="Curated" value="curated" />
      <Tab label="Longest" value="longest" />
      <Tab label="Shortest" value="shortest" />
    </Tabs>
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
}
TopicDetails.getInitialProps = async (ctx: NextPageContext) => {
  const { topicid: title } = (ctx.query as unknown) as QueryProps;
  const talks = await Database.getTalksByTopic(title);
  return { title, talks };
};

export default TopicDetails;
