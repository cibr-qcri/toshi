// React
import React from "react";

// GraphVis
import Graph from "react-graph-vis";
import "vis-network/styles/vis-network.css";

// Redux
import { useSelector } from "react-redux";

// Material
import { useTheme } from "@material-ui/core/styles";

// Styles
import { useStyles } from "./WalletTopLinks-styles";
import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@material-ui/core";

export const TopLinks = (props) => {
  // Variables
  const classes = useStyles();
  const theme = useTheme();
  const walletId = useSelector((state) => state.wallet.id);
  const topLinks = useSelector((state) => state.wallet.topLinks.result);
  const isBusy = useSelector((state) => state.wallet.topLinks.isBusy);

  const options = {
    physics: false,
    autoResize: true,
    layout: {
      hierarchical: {
        enabled: false,
      },
    },
    edges: {
      color: {
        color: theme.palette.text.primary,
      },
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
      borderWidth: 0,
      shape: "box",
      margin: 10,
      color: {
        background: "#707070",
        hover: {
          background: "#a39e9e",
        },
      },
      font: {
        size: 14,
        face: "roboto",
        color: theme.palette.primary.contrastText,
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
      let selectedId = nodes[0];
      if (selectedId && selectedId !== walletId) {
        window.open("/wallet/" + selectedId, "_blank");
      }
    },
  };

  const view = (
    <Card className={classes.root} variant="outlined">
      <Typography className={classes.header}>
        Top-5 Connected Wallets
      </Typography>
      <CardContent className={classes.cardBody}>
        {isBusy ? (
          <div className={classes.centerElement}>
            <CircularProgress size={30} />
          </div>
        ) : Object.keys(topLinks).length > 0 && topLinks.edges.length > 0 ? (
          <Graph graph={topLinks} options={options} events={events} />
        ) : (
          <Typography
            className={classes.empty}
            align="center"
            variant="subtitle1"
            color="textSecondary"
          >
            No wallets found
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return view;
};

export default TopLinks;
