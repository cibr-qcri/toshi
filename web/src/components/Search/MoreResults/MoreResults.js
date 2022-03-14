// React
import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Material
import { Button } from "@material-ui/core";

// Store
import { getBlockchainResults } from "../../../store/actions";

// Styles
import { useStyles } from "./MoreResults-styles";

const SearchMoreResults = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { query, source } = props;
  const isBusy = useSelector((state) => state.search.isBusy);

  // Handlers
  const moreResultsHandler = () => {
    if (source === "blockchain") {
      dispatch(getBlockchainResults(query, true));
    }
  };

  //JSX
  const view = (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={moreResultsHandler}
      >
        {isBusy ? "Loading ..." : "More Results"}
      </Button>
    </div>
  );

  return view;
};

export default SearchMoreResults;
