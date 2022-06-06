// React
import React from 'react';

// Material
import { Drawer, Divider, Typography } from '@material-ui/core';

// Components
import General from './General';
import Settings from './Settings';
import Info from './Info';
import Outreach from './Outreach';

// Redux
import { useSelector } from 'react-redux';

// Styles
import { useStyles } from './HeaderMenu-styles';

const HeaderMenu = (props) => {
  // Variables
  const classes = useStyles();
  const { open, onClose, isAuth } = props;
  const blockCount = useSelector(
    (state) => state.stats.data.computed.count.block
  );

  //JSX
  const view = (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
      >
        <General onClose={onClose} />
        <Divider />
        <Settings onClose={onClose} isAuth={isAuth} />
        <Divider />
        <Info />
        <Divider />
        <Outreach onClose={onClose} isAuth={isAuth} />
        <div className={classes.drawerNote}>
          <Typography variant="caption">
            Updated to block {blockCount}
          </Typography>
        </div>
      </Drawer>
    </div>
  );

  return view;
};

export default HeaderMenu;
