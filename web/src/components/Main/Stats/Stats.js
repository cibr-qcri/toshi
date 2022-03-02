// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Material
import { Typography } from '@material-ui/core';

// Store
import { getStats } from '../../../store/actions';

// Styles
import { useStyles, Stat } from './Stats-styles';

const MainStats = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.stats.data.computed);
  const cryptosCount = Object.values(stats.count.crypto).reduce(
    (a, b) => a + b
  );

  // Hooks
  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  // JSX
  const view = (
    <div className={classes.root}>
      <Typography className={classes.title} color="primary" variant="h5">
        Extended coverage
      </Typography>
      <Typography className={classes.subtitle}>
        Find what you're looking for in Toshi
      </Typography>
      <div className={classes.stats}>
        <Stat value={stats.count.page} text="Wallets" />
        <Stat value={stats.count.domain} text="Labels" />
        <Stat value={cryptosCount} text="Risk Level" />
      </div>
    </div>
  );

  return view;
};

export default MainStats;
