// React
import React, { useRef } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

// Components
import Title from "./Title";
import Form from "./Form";

// Store
import { hideFeedbackDialog } from "../../store/actions";

// Styles
import { useStyles } from "./FeedbackDialog-styles";

const FeedbackDialog = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const formRef = useRef();
  const open = useSelector((state) => state.dialog.feedback.open);

  // Handlers
  const toggleFeedbackHandler = () => {
    dispatch(hideFeedbackDialog());
  };

  const submitFormHandler = () => {
    // Calling formRef.current.submit() does not work.
    // Instead, creating a custom event using the old-fashioned way.
    // This is compatible with all browsers, including IE.
    // See https://stackoverflow.com/a/28907911
    const submitEvent = document.createEvent("Event");
    submitEvent.initEvent("submit", true, true);
    formRef.current.dispatchEvent(submitEvent);
  };

  //JSX
  const view = (
    <Dialog open={open} onClose={toggleFeedbackHandler} fullWidth>
      <Title onClose={toggleFeedbackHandler}>Help Us Improve</Title>
      <DialogContent dividers>
        <DialogContentText>What could be better?</DialogContentText>
        <Form formRef={formRef} onClose={toggleFeedbackHandler} />
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

export default FeedbackDialog;
