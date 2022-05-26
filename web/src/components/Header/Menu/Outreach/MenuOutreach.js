// React
import React from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material
import {
  Twitter as TwitterIcon,
  ContactMail as ContactUsIcon,
  Feedback as FeedbackIcon,
  Report as ReportIcon,
} from '@material-ui/icons';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';

// Store
import { showFeedbackDialog, showTagDialog } from '../../../../store/actions';

// Styles
import { useStyles } from './MenuOutreach-styles';

const MenuOutreach = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onClose, isAuth } = props;
  const twitterLink = 'https://twitter.com/QatarComputing';
  const contactLink = 'mailto:contact@mail.cibr.qcri.org?subject=Hello!';

  // Handlers
  const feedbackHandler = () => {
    onClose();
    dispatch(showFeedbackDialog());
  };
  const reportsHandler = () => {
    onClose();
    dispatch(showTagDialog('', false));
  };

  //JSX
  const header = (
    <ListSubheader className={classes.header}>Keep in Touch</ListSubheader>
  );

  let feedback = null;
  let reports = null;
  if (isAuth) {
    feedback = (
      <ListItem button component="a" onClick={feedbackHandler}>
        <ListItemIcon>
          <FeedbackIcon />
        </ListItemIcon>
        <ListItemText primary="Send Feedback" />
      </ListItem>
    );
    reports = (
      <ListItem button component="a" onClick={reportsHandler}>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Report Incident" />
      </ListItem>
    );
  }

  const view = (
    <div className={classes.root}>
      <List className={classes.list} subheader={header}>
        <ListItem
          button
          component="a"
          href={twitterLink}
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="Twitter" />
        </ListItem>
        <ListItem
          button
          component="a"
          href={contactLink}
          onClick={onClose}
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <ContactUsIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
        {feedback}
        {reports}
      </List>
    </div>
  );

  return view;
};

export default MenuOutreach;
