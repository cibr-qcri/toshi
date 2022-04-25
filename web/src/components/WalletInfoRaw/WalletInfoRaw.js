// React
import React, { Fragment } from 'react';

// Material
import { Card } from '@material-ui/core';

// PropTypes
import PropTypes from 'prop-types';

// Components
import Title from './Title';
import Actions from './Actions';
import Info from './Body';
import { useLocation } from 'react-router-dom';

const WalletInfoRaw = (props) => {
  // Variables
  const location = useLocation();
  const { classes, id, info, moneyFlow } = props;
  const isClickableTitle = location.pathname.startsWith('/search');

  //JSX
  const view = (
    <div className={classes.root}>
      <Card variant="outlined">
        <Title id={id} isClickable={isClickableTitle} />
        <Fragment>
          <Info items={info} />
          <Actions id={id} moneyFlow={moneyFlow} />
        </Fragment>
      </Card>
    </div>
  );

  return view;
};

// Typechecking
WalletInfoRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }),
};

// Dynamic styling
WalletInfoRaw.styledAs = 'WalletInfoRaw';

export default WalletInfoRaw;
