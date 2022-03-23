// React
import React from 'react';

import Graph from "react-graph-vis";
import 'antd/dist/antd.css';
import {Empty} from 'antd';

// Redux
import {useSelector} from 'react-redux';

// Styles
import {useStyles} from './WalletTopLinks-styles';
import {Card, CardContent, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export const TopLinks = (props) => {
  // Variables
  const classes = useStyles();
  const history = useHistory();
  // const isBusy = useSelector((state) => state.wallet.data.isBusy);
  const topLinks = useSelector((state) => state.wallet.topLinks.result);

  const options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    layout: {
      hierarchical: {
        enabled: false,
        nodeSpacing: 425,
      },
    },
    edges: {
      arrows: {
        to: false,
        from: false,
      },
      length: 160,
    },
    nodes: {
      color: {
        background: '#ffffff',
      },
      font: {
        size: 22,
        face: 'roboto',
      },
    },
    interaction: {
      zoomView: false,
      dragNodes: false,
      dragView: false,
    },
    configure: {
      enabled: true,
      filter: 'physics, layout',
      showButton: true,
    }
  };

  const events = {
    select: ({nodes, edges}) => {
      history.push('/wallet/' + nodes);
    },
  };

  const view = (
    <Card className={classes.root} variant="outlined">
      <Typography className={classes.header}>
        Top Connected Wallets
      </Typography>
      {
        topLinks.edges.length > 0 ?
          <CardContent className={classes.graph}>
            <Graph
              graph={topLinks}
              options={options}
              events={events}
              style={{ height: "300px" }}
            />
          </CardContent>
          :
          <CardContent className={classes.empty}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No connected wallets found"/>
          </CardContent>
      }
    </Card>
  );

  return view;
};

export default TopLinks;
