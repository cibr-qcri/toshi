// React
import React from "react";

// Material
import { Link, Typography } from "@material-ui/core";

// Styles
import { useStyles } from "./WalletInfoTitle-styles";
import { titleShortener } from "../../../utils/common";
import CurrencyToggle from "../../CurrencyToggle";

const WalletInfoTitle = (props) => {
  // Variables
  const classes = useStyles();
  const { id, isClickable = false } = props;
  //JSX
  const view = (
    <div className={classes.root}>
      <Typography className={classes.typography}>
        {isClickable ? (
          <Link
            className={classes.link}
            href={"/wallet/" + id}
            target="_blank"
            rel="noopener"
          >
            {titleShortener("wallet", id)}
          </Link>
        ) : (
          titleShortener("wallet", id)
        )}
      </Typography>
      <CurrencyToggle />
    </div>
  );

  return view;
};

export default WalletInfoTitle;
