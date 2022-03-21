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

const WalletInfoRaw = (props) => {
  // Variables
  const { classes, id, info, type } = props;

  // Handlers

  //JSX
  const view = (
    <div className={classes.root}>
      <Card variant="outlined">
        <Title id={id} />
        <Fragment>
          <Info items={info} />
          <Actions id={id} type={type} />
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
