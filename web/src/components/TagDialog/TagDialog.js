// React
import React, { useRef } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

// Components
import Title from './Title';
import Form from './Form';

// Store
import { hideTagDialog } from '../../store/actions';

// Styles
import { useStyles } from './TagDialog-styles';

const TagDialog = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const formRef = useRef();
  const open = useSelector((state) => state.dialog.tag.open);
  const isWalletTagging = useSelector(
    (state) => state.dialog.tag.isWalletTagging
  );
  const [scroll] = React.useState('paper');

  // Handlers
  const toggleTagHandler = () => {
    dispatch(hideTagDialog());
  };

  const submitFormHandler = () => {
    // Calling formRef.current.submit() does not work.
    // Instead, creating a custom event using the old-fashioned way.
    // This is compatible with all browsers, including IE.
    // See https://stackoverflow.com/a/28907911
    const submitEvent = document.createEvent('Event');
    submitEvent.initEvent('submit', true, true);
    formRef.current.dispatchEvent(submitEvent);
  };

  let dialogTitle;
  let dialogDescription;
  if (isWalletTagging) {
    dialogTitle = 'Suggest a New Tag';
    dialogDescription = 'What information best describes this wallet?';
  } else {
    dialogTitle = 'Report an Incident';
    dialogDescription =
      'Cryptocurrency abuse can take many forms. What information best describes this incident?';
  }

  //JSX
  const view = (
    <Dialog open={open} scroll={scroll} onClose={toggleTagHandler} fullWidth>
      <Title onClose={toggleTagHandler}>{dialogTitle}</Title>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText>{dialogDescription}</DialogContentText>
        <Form formRef={formRef} onClose={toggleTagHandler} />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={submitFormHandler} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );

  return view;
};

export default TagDialog;
