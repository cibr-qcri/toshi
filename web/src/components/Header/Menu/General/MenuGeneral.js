// React
import React from 'react';
import { NavLink } from 'react-router-dom';

// Material
import { Home } from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

// Styles
import { useStyles } from './MenuGeneral-styles';

const MenuGeneral = (props) => {
  // Variables
  const classes = useStyles();
  const { onClose } = props;

  const view = (
    <div className={classes.root}>
      <List className={classes.list}>
        <ListItem
          button
          component={NavLink}
          to="/main"
          rel="noopener"
          onClick={onClose}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </div>
  );

  return view;
};

export default MenuGeneral;
