// React
import React, {Fragment} from 'react';

// Material
import {Card} from '@material-ui/core';

// Components
import Title from './Title';
import Actions from './Actions';
import Info from './Info';

// Styles
import {useStyles} from './WalletResult-styles';

const WalletResult = (props) => {
  // Variables
  const classes = useStyles();
  const {id, info, url, title, type} = props;

  // Handlers

  //JSX
  const view = (
    <div className={classes.root}>
      <Card variant="outlined">
        <Title text={title.split('-')[0]} url={url}/>
        <Fragment>
          <Info items={info}/>
          <Actions id={id} type={type}/>
        </Fragment>
      </Card>
    </div>
  );

  return view;
};

export default WalletResult;
