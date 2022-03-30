// React
import React from "react";

// Styles
import { useStyles } from "./CurrencyToggle-styles";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { setWalletCurrencyType } from "../../store/actions/wallet/creators";
import {useLocation} from "react-router-dom";

const CurrencyToggle = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation()
  const type = useSelector((state) => state.wallet.currency);

  const handleCurrencyType = (event, currencyType) => {
    if (currencyType !== null) {
      dispatch(setWalletCurrencyType({ currencyType }));
    }
  };

  //JSX
  return location.pathname.startsWith('/wallet/') ? (
    <div className={classes.root}>
      <ToggleButtonGroup
        id="currency-select"
        size="small"
        value={type}
        exclusive
        onChange={handleCurrencyType}
        aria-label="Wallet Currency Type"
        className={classes.toggle}
      >
        <ToggleButton value="btc" classes={{ selected: classes.selected }}>
          BTC
        </ToggleButton>
        <ToggleButton value="usd" classes={{ selected: classes.selected }}>
          USD
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  ) : (
    <div />
  );
};

export default CurrencyToggle;
