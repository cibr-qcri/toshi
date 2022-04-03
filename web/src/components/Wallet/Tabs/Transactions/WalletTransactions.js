// React
import React, { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Store
import { getWalletTx } from '../../../../store/actions';

// Styles
import { useStyles, DataTable } from './WalletTransactions-styles';

export const WalletTransactions = () => {
  // Variables
  const classes = useStyles();
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.transactions.result);
  const totalCount = useSelector((state) => state.wallet.transactions.count);
  const isBusy = useSelector((state) => state.wallet.transactions.isBusy);
  const currencyType = useSelector((state) => state.wallet.currency);
  const [columns, setTableColumns] = useState([]);

  // Hooks
  useEffect(() => {
    if (currencyType) {
      let columnMap = [
        {
          id: 'transaction',
          label: 'Transaction',
          align: 'left',
        },
        {
          id: 'isCoinbase',
          label: 'Coinbase',
          align: 'left',
        },
        {
          id: 'type',
          label: 'Flow',
          align: 'left',
        },
        {
          id: 'blockNumber',
          label: 'Block',
          align: 'right',
        },
      ];
      if (currencyType === 'btc') {
        columnMap.push(
          {
            id: 'inputBTCValue',
            label: 'Total In',
            align: 'right',
          },
          {
            id: 'outputBTCValue',
            label: 'Total Out',
            align: 'right',
          }
        );
      } else {
        columnMap.push(
          {
            id: 'inputUSDValue',
            label: 'Total In',
            align: 'right',
          },
          {
            id: 'outputUSDValue',
            label: 'Total Out',
            align: 'right',
          }
        );
      }
      setTableColumns(columnMap);
    }
  }, [currencyType]);

  const view = (
    <div className={classes.root}>
      <DataTable
        rows={rows}
        columns={columns}
        totalCount={totalCount}
        action={(page, count) => getWalletTx(walletId, page, count)}
        isBusy={isBusy}
        type="transaction"
      />
    </div>
  );

  return view;
};

export default WalletTransactions;
