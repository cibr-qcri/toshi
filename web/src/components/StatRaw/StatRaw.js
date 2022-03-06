// React
import React, { useEffect, useState } from 'react';

// PropTypes
import PropTypes, {oneOfType} from 'prop-types';

// Numeral
import numeral from 'numeral';

// Material
import { Typography } from '@material-ui/core';

const StatRaw = (props) => {
  // Variables
  const { classes, value = 0, text, isText = false } = props;
  const [animatedValue, setAnimatedValue] = useState(value);

  // Hooks
  useEffect(() => {
    let timer = setInterval(() => {
      value && setAnimatedValue(value);
    }, 1000);
    return () => value && clearInterval(timer);
  }, [value]);

  const renderNumericValue = () => animatedValue === 0 ? 'N/A' : numeral(animatedValue).format('0.0a')

  // JSX
  const view = (
    <div className={classes.root}>
      <Typography variant="h5" color="primary">
        {isText ? value : renderNumericValue()}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </div>
  );

  return view;
};

// Typechecking
StatRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }),
  value: oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string.isRequired,
};

// Dynamic styling
StatRaw.styledAs = 'StatRaw';

export default StatRaw;
