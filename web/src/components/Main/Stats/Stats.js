// React
import React, {useEffect, useState} from 'react';

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
  const [riskLevel, setRiskLevel] = useState("N/A");

  // Hooks
  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  useEffect(() => {
    if (stats.count.riskLevelScore >= 0.75) {
        setRiskLevel("HIGH")
    } else if (stats.count.riskLevelScore < 0.75 && stats.count.riskLevelScore >= 0.5) {
        setRiskLevel("MEDIUM")
    } else if (stats.count.riskLevelScore < 0.5 && stats.count.riskLevelScore >= 0) {
        setRiskLevel("LOW")
    }
  }, [stats]);

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
        <Stat value={stats.count.wallet} text="Wallets" />
        <Stat value={stats.count.label} text="Labels" />
        <Stat value={riskLevel} text="Risk Level" isText />
      </div>
    </div>
  );

  return view;
};

export default MainStats;
