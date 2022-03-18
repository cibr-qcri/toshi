// React
import React from "react";

// Material
import { Link, Typography } from "@material-ui/core";

// Styles
import { useStyles } from "./ResultTitle-styles";

const ResultTitle = (props) => {
  // Variables
  const classes = useStyles();
  const { text } = props;
  //JSX
  const view = (
    <div className={classes.root}>
      <Typography className={classes.typography}>
        <Link
          className={classes.link}
          href={"/info/wallet?id=" + text}
          target="_blank"
          rel="noopener"
        >
          Wallet [{text.split('-')[0]}]
        </Link>
      </Typography>
    </div>
  );

  return view;
};

export default ResultTitle;
