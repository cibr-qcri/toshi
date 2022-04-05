// React
import React, { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Store
import { getWalletLinks } from '../../../../store/actions';

// Styles
import { useStyles, DataTable } from './WalletLinks-styles';

export const WalletLinks = () => {
  // Variables
  const classes = useStyles();
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.links.result);
  const totalCount = useSelector((state) => state.wallet.links.count);
  const isBusy = useSelector((state) => state.wallet.links.isBusy);
  const currencyType = useSelector((state) => state.wallet.currency);
  const [columns, setTableColumns] = useState([]);

  // Hooks
  useEffect(() => {
    if (currencyType) {
      let columnMap = [{ id: 'wallet', label: 'Wallet', align: 'left' }];
      if (currencyType === 'btc') {
        columnMap.push(
          { id: 'inBTCAmount', label: 'Total In', align: 'right' },
          { id: 'numInTxes', label: 'In Txes', align: 'right' },
          { id: 'outBTCAmount', label: 'Total Out', align: 'right' },
          { id: 'numOutTxes', label: 'Out Txes', align: 'right' }
        );
      } else {
        columnMap.push(
          { id: 'inUSDAmount', label: 'Total In', align: 'right' },
          { id: 'numInTxes', label: 'In Txes', align: 'right' },
          { id: 'outUSDAmount', label: 'Total Out', align: 'right' },
          { id: 'numOutTxes', label: 'Out Txes', align: 'right' }
        );
      }
      setTableColumns(columnMap);
    }
  }, [currencyType]);

  // JSX
  const view = (
    <div className={classes.root}>
      <DataTable
        rows={rows}
        columns={columns}
        totalCount={totalCount}
        action={(page, count) => getWalletLinks(walletId, page, count)}
        isBusy={isBusy}
        type="wallet"
      />
    </div>
  );

  return view;
};

export default WalletLinks;
