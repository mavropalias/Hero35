import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import {
  connectSearchBox,
  connectInfiniteHits
} from "react-instantsearch/connectors";
import React, { useState, useEffect } from "react";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  InputBase,
  createStyles,
  Theme,
  makeStyles,
  Button,
  Paper,
  Typography,
  Box,
  IconButton
} from "@material-ui/core";
import { Search as SearchIcon, Clear as ClearIcon } from "@material-ui/icons";
import { TalkPreview } from "../schema";
import TalkList from "./TalkList";
import { APP_BAR_HEIGHT } from "../constants/sizes";

const algoliaClient = algoliasearch(
  "B9STNN0U9I",
  "a2195aae7008bee1020765ade21b0bae"
);

const searchClient = {
  search(requests) {
    // Do not connect to Algolia on page load
    if (requests.length > 0 && requests[0].params.query === "") {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          processingTimeMS: 0
        }))
      });
    }
    return algoliaClient.search(requests);
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      display: "flex",
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      flexGrow: 1,
      transition: theme.transitions.create("background-color"),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%"
    },
    searchResults: {
      position: "fixed",
      left: 0,
      top: APP_BAR_HEIGHT,
      width: "100%",
      margin: theme.spacing(0),
      height: `calc(100vh - ${APP_BAR_HEIGHT})`,
      overflow: "auto"
    }
  })
);

const SearchInput: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  const [searching, setSearching] = useState(false);
  const [focused, setFocused] = useState(false);

  const onSearchStateChange = searchState => {
    setSearching(searchState.query ? true : false);
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="talks"
      onSearchStateChange={state => onSearchStateChange(state)}
    >
      <Configure hitsPerPage={10} />
      <ConnectedSearchBox
        className={props.className}
        onBlur={_ => setFocused(false)}
        onFocus={_ => setFocused(true)}
      />
      {searching && <ConnectedHits visible={searching && focused} />}
    </InstantSearch>
  );
};

const MaterialUiSearchBox = ({
  currentRefinement,
  refine,
  className,
  onFocus,
  onBlur
}) => {
  const classes = useStyles({});

  return (
    <div className={`${classes.search} ${className}`}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={currentRefinement}
        onChange={e => refine(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Search…"
        fullWidth={true}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
      />
      {currentRefinement && (
        <IconButton
          size="small"
          aria-label="close search"
          onClick={_ => refine("")}
        >
          <ClearIcon />
        </IconButton>
      )}
    </div>
  );
};

const CustomHits = ({
  hits,
  hasMore,
  refine,
  visible
}: {
  hits: TalkPreview[];
  hasMore: boolean;
  refine: any;
  visible: boolean;
}) => {
  const classes = useStyles({});
  const [clickedOnResult, setClickedOnResult] = useState(false);

  useEffect(() => {
    if (visible) setClickedOnResult(false);
  }, [visible]);

  return (
    <>
      <Paper
        className={classes.searchResults}
        elevation={8}
        hidden={clickedOnResult && !visible}
      >
        {hits.length > 0 ? (
          <TalkList
            talks={hits}
            onClick={_ => setClickedOnResult(true)}
            showEvent={true}
          />
        ) : (
          <Box m={3}>
            <Typography variant="h5" paragraph>
              <code>🧐🤞 results.length === 0 😤👎</code>
            </Typography>
            <Typography variant="subtitle1">
              You can search by event/talk title, speaker, description, tag, and
              year. Try these:
            </Typography>
            <Typography variant="body1">- hooks 2019</Typography>
            <Typography variant="body1">- react native performance</Typography>
            <Typography variant="body1">- graphql</Typography>
            <Typography variant="body1">- redux vs mobx</Typography>
            <Typography variant="body1">- a11y</Typography>
          </Box>
        )}
        <Box
          m={1}
          marginRight={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {hasMore && (
            <Button
              onClick={() => {
                if (hasMore) {
                  refine();
                }
              }}
              variant="outlined"
              disabled={!hasMore}
            >
              Load more
            </Button>
          )}
          {hits.length > 0 && (
            <img src="/search-by-algolia-dark-background.svg" height="14"></img>
          )}
        </Box>
      </Paper>
    </>
  );
};

const ConnectedSearchBox = connectSearchBox(MaterialUiSearchBox);
const ConnectedHits = connectInfiniteHits(CustomHits);

export default SearchInput;
