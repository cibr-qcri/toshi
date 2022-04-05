// React
import React from 'react';
import { useLocation } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

// Store
import { setWalletCurrencyType } from '../../store/actions';

// Styles
import { useStyles } from './CurrencyToggle-styles';

const CurrencyToggle = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const type = useSelector((state) => state.wallet.currency);

  // Handlers
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
        <ToggleButton
          color="error"
          value="usd"
          classes={{ selected: classes.selected }}
        >
          USD
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  ) : (
    <div />
  );
};

export default CurrencyToggle;
