// React
import React from "react";

import Graph from "react-graph-vis";
import "vis-network/styles/vis-network.css";

// Redux
import { useSelector } from "react-redux";

// Styles
import { useStyles } from "./WalletTopLinks-styles";
import { Card, CardContent, Typography } from "@material-ui/core";

export const TopLinks = (props) => {
  // Variables
  const classes = useStyles();
  const walletId = useSelector((state) => state.wallet.id);
  const topLinks = useSelector((state) => state.wallet.topLinks.result);

  const options = {
    physics: false,
    autoResize: false,
    layout: {
      hierarchical: {
        enabled: false,
      },
    },
    edges: {
      arrows: {
        to: {
          enabled: true,
        },
      },
      smooth: {
        enabled: true,
      },
    },
    nodes: {
      shape: "box",
      color: {
        background: "#707070",
        hover: {
          background: "#a39e9e",
        },
      },
      font: {
        size: 21,
        face: "roboto",
        color: "#ffffff",
      },
    },
    interaction: {
      zoomView: false,
      dragNodes: false,
      dragView: false,
      hover: true,
      selectable: true,
    },
  };

  const events = {
    select: ({ nodes, edges }) => {
      if (nodes[0] !== walletId) {
        window.open("/wallet/" + nodes[0], "_blank");
      }
    },
  };

  const view = (
    <Card className={classes.root} variant="outlined">
      <Typography className={classes.header}>Top Connected Wallets</Typography>
      {Object.keys(topLinks).length > 0 && topLinks.edges.length > 0 ? (
        <CardContent className={classes.graph}>
          <Graph
            graph={topLinks}
            options={options}
            events={events}
            style={{ height: "300px" }}
          />
        </CardContent>
      ) : (
        <CardContent className={classes.empty}>
          <Typography align="center" variant="subtitle1" color="textSecondary">
            No connected wallets found
          </Typography>
        </CardContent>
      )}
    </Card>
  );

  return view;
};

export default TopLinks;
