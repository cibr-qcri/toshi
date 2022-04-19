// React
import React, { useEffect, useState } from 'react';

// Material
import { Info as InfoIcon } from '@material-ui/icons';
import { Divider, Grid, Tooltip, Typography } from '@material-ui/core';

// Styles
import { useStyles } from './WalletInfoBody-styles';
import { useSelector } from 'react-redux';

const WalletInfoBody = (props) => {
  // Variables
  const classes = useStyles();
  const { items } = props;
  const [walletInfoItems, setWalletInfoItems] = useState(items);
  const currencyType = useSelector((state) => state.wallet.currency);

  // Hooks
  useEffect(() => {
    if (currencyType) {
      const itemMap = { ...items };
      if (currencyType === 'btc') {
        delete itemMap.totalUSDIn;
        delete itemMap.totalUSDOut;
        delete itemMap.usdBalance;
      } else {
        delete itemMap.totalBTCIn;
        delete itemMap.totalBTCOut;
        delete itemMap.btcBalance;
      }
      setWalletInfoItems(itemMap);
    }
  }, [currencyType, items]);

  // Renderers
  const renderWalletInfoName = (info) => {
    let name = <Typography variant="body2">{info.name}</Typography>;
    if (info.name === 'Balance' && parseInt(info.value.replace('$', '')) < 0) {
      name = (
        <Typography className={classes.infoItem} variant="body2">
          {info.name}
          <Tooltip title="Negative value is due to different exchange rates at different transaction times">
            <InfoIcon className={classes.infoIcon} color="action" />
          </Tooltip>
        </Typography>
      );
    } else if (
      (info.name === 'Top Label' || info.name === 'Top Category') &&
      !info.value
    ) {
      const type = info.name === 'Top Category' ? 'categories' : 'labels';
      name = (
        <Typography className={classes.infoItem} variant="body2">
          {info.name}
          <Tooltip
            title={`Multiple ${type} with the same number of occurances are associated with this wallet`}
          >
            <InfoIcon className={classes.infoIcon} color="action" />
          </Tooltip>
        </Typography>
      );
    }
    return name;
  };

  //JSX
  const infoItems = Object.values(walletInfoItems).map((info, index) => {
    let value = info.value;
    if (
      (info.name === 'Top Label' || info.name === 'Top Category') &&
      !info.value
    ) {
      value = 'Multiple';
    }
    return (
      <Grid className={classes.item} key={index} item xs={12} sm={6}>
        {renderWalletInfoName(info)}
        <Typography variant="body2" color="textSecondary">
          {value}
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
    );
  });

  const view = (
    <div className={classes.root}>
      <Grid className={classes.content} container>
        {infoItems}
      </Grid>
    </div>
  );

  return view;
};

export default WalletInfoBody;
