// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Store
import { getWalletLabels } from '../../../../store/actions';

// Styles
import { useStyles, DataTable } from './WalletLabels-styles';

export const WalletLabels = () => {
  // Variables
  const classes = useStyles();
  const walletId = useSelector((state) => state.wallet.id);
  const rows = useSelector((state) => state.wallet.labels.result);
  const totalCount = useSelector((state) => state.wallet.labels.count);
  const isBusy = useSelector((state) => state.wallet.labels.isBusy);
  const columns = [
    { id: 'label', label: 'Label', align: 'left' },
    { id: 'category', label: 'Category', align: 'left' },
    { id: 'source', label: 'Source', align: 'left' },
    { id: 'address', label: 'Address', align: 'left' },
  ];

  // JSX
  const view = (
    <div className={classes.root}>
      <DataTable
        rows={rows}
        columns={columns}
        totalCount={totalCount}
        action={(page, count) => getWalletLabels(walletId, page, count)}
        isBusy={isBusy}
        type="label"
      />
    </div>
  );

  return view;
};

export default WalletLabels;
