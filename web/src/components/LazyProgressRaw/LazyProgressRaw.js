// React
import React from "react";

// PropTypes
import PropTypes from "prop-types";

// Material
import { CircularProgress, Typography } from "@material-ui/core";

export const LazyProgressRaw = (props) => {
  // Variables
  const { classes } = props;

  // JXS
  const view = (
    <div className={classes.root}>
      <CircularProgress />
      <Typography className={classes.LoadingLabel} variant="body2" color="textSecondary">
        Loading...
      </Typography>
    </div>
  );
  return view;
};

// Typechecking
LazyProgressRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }),
};

// Dynamic styling
LazyProgressRaw.styledAs = "LazyProgressRaw";

export default LazyProgressRaw;
