// React
import React from "react";

import ReactWordcloud from "react-wordcloud";

// Redux
import { useSelector } from "react-redux";

// Styles
import { useStyles } from "./WalletLabelCloud-styles";
import { Card, CardContent, Typography } from "@material-ui/core";

export const WalletLabelCloud = (props) => {
  // Variables
  const classes = useStyles();
  const labels = useSelector((state) => state.wallet.data.labels);
  const isBusy = useSelector((state) => state.wallet.data.isBusy);

  const options = {
    enableTooltip: false,
    deterministic: false,
    fontFamily: "roboto",
    rotationAngles: [0],
    fontSizes: [20, 40],
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 500,
  };

  const view = (
    <Card className={classes.root} variant="outlined">
      <Typography className={classes.header}>Top-5 Reported Labels</Typography>
      <CardContent className={classes.cardBody}>
        {labels.length > 0 ? (
          <ReactWordcloud maxWords={5} options={options} words={labels} />
        ) : (
          <Typography align="center" variant="subtitle1" color="textSecondary">
            {isBusy ? "Loading..." : "No labels found"}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return view;
};

export default WalletLabelCloud;
