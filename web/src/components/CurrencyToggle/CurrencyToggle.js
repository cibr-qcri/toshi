// React
import React from "react";

// Styles
import { useStyles } from "./CurrencyToggle-styles";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { setWalletCurrencyType } from "../../store/actions/wallet/creators";

const CurrencyToggle = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.wallet.currency);
  const walletData = useSelector((state) => state.wallet.data.info);

  const handleCurrencyType = (event, currencyType) => {
    if (currencyType !== null) {
      dispatch(setWalletCurrencyType({ currencyType }));
    }
  };

  //JSX
  return Object.keys(walletData).length > 0 ? (
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
