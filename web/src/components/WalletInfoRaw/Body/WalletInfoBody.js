// React
import React, { useEffect } from "react";

// Material
import { Divider, Grid, Typography } from "@material-ui/core";

// Styles
import { useStyles } from "./WalletInfoBody-styles";
import { useSelector } from "react-redux";

const WalletInfoBody = (props) => {
  // Variables
  const classes = useStyles();
  const { items } = props;
  const [walletInfoItems, setWalletInfoItems] = React.useState(items);
  const currencyType = useSelector((state) => state.wallet.currency);

  // Hooks
  useEffect(() => {
    if (currencyType) {
      const itemMap = { ...items };
      if (currencyType === "btc") {
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

  //JSX
  const infoItems = Object.values(walletInfoItems).map((info, index) => {
    return (
      <Grid className={classes.item} key={index} item xs={12} sm={6}>
        <Typography variant="body2">{info.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {info.value}
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
