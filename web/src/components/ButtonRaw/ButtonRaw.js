// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

import { Button, CircularProgress } from '@material-ui/core';

const ButtonRaw = (props) => {
  // Variables
  const {
    classes,
    title,
    loading,
    disabled,
    loadingIndicatorSize,
    color,
    onClick,
  } = props;

  const view = (
    <div className={classes.root}>
      <Button
        onClick={onClick}
        className={classes.button}
        variant="contained"
        color={color || 'primary'}
        size="large"
        type="submit"
        disabled={loading || disabled}
        endIcon={
          loading ? (
            <CircularProgress
              size={loadingIndicatorSize || 26}
              color="inherit"
            />
          ) : null
        }
      >
        {loading ? '' : title}
      </Button>
    </div>
  );

  return view;
};

// Typechecking
ButtonRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

// Dynamic styling
ButtonRaw.styledAs = 'ButtonRaw';

export default ButtonRaw;
