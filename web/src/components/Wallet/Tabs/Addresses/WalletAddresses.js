// React
import React, { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Store
import { getWalletAddresses } from '../../../../store/actions';

// Styles
import { useStyles, DataTable } from './WalletAddresses-styles';

export const WalletAddresses = () => {
  // Variables
  const classes = useStyles();
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.addresses.result);
  const totalCount = useSelector((state) => state.wallet.addresses.count);
  const isBusy = useSelector((state) => state.wallet.addresses.isBusy);
  const currencyType = useSelector((state) => state.wallet.currency);
  const [columns, setTableColumns] = useState([]);

  // Hooks
  useEffect(() => {
    if (currencyType) {
      let columnMap = [
        {
          id: 'address',
          label: 'Address',
          align: 'left',
        },
      ];
      if (currencyType === 'btc') {
        columnMap.push(
          {
            id: 'totalReceivedBTC',
            label: 'Total In',
            align: 'right',
          },
          {
            id: 'totalSpentBTC',
            label: 'Total Out',
            align: 'right',
          },
          {
            id: 'btcBalance',
            label: 'Balance',
            align: 'right',
          }
        );
      } else {
        columnMap.push(
          {
            id: 'totalReceivedUSD',
            label: 'Total In',
            align: 'right',
          },
          {
            id: 'totalSpentUSD',
            label: 'Total Out',
            align: 'right',
          },
          {
            id: 'usdBalance',
            label: 'Balance',
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
        action={(page, count) => getWalletAddresses(walletId, page, count)}
        isBusy={isBusy}
        type="address"
      />
    </div>
  );

  return view;
};

export default WalletAddresses;
