// React
import React from 'react';

import ReactWordcloud from 'react-wordcloud';
import 'antd/dist/antd.css';
import { Empty } from 'antd';

// Redux
import { useSelector } from 'react-redux';

// Styles
import { useStyles } from './WalletLabels-styles';
import {Card, CardContent, Typography} from "@material-ui/core";

export const WalletLabels = (props) => {
  // Variables
  const classes = useStyles();
  // const isBusy = useSelector((state) => state.wallet.data.isBusy);
  const labels = useSelector((state) => state.wallet.data.labels);

  const options = {
    enableTooltip: true,
    deterministic: false,
    fontFamily: "roboto",
    rotationAngles: [0],
    fontSizes: [20, 40],
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 500
  };

  const view = (
    <Card className={classes.root} variant="outlined">
      <Typography className={classes.header}>
        Reported Labels
      </Typography>
        {
          labels.length > 0 ?
            <CardContent className={classes.cloud}>
              <ReactWordcloud maxWords={30} options={options} words={labels} />
            </CardContent>
            :
            <CardContent className={classes.empty}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Labels Reported" />
            </CardContent>
        }
    </Card>
  );

  return view;
};

export default WalletLabels;
