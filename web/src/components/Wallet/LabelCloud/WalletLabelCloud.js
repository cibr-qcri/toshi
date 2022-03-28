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
      <Typography className={classes.header}>Labels Overview</Typography>
      <CardContent>
        {labels.length > 0 ? (
          <div className={classes.cloud}>
            <ReactWordcloud maxWords={30} options={options} words={labels} />
          </div>
        ) : (
          <Typography
            className={classes.empty}
            align="center"
            variant="subtitle1"
            color="textSecondary"
          >
            No labels found
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return view;
};

export default WalletLabelCloud;
