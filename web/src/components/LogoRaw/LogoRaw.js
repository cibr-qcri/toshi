// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Router
import { NavLink } from 'react-router-dom';

// Material
import { Link, Typography } from '@material-ui/core';

const LogoRaw = (props) => {
  // Variables
  const { classes } = props;

  // JSX
  const view = (
    <div className={classes.root}>
      <Link className={classes.link} component={NavLink} to="/">
        <Typography className={classes.logo}>Toshi</Typography>
      </Link>
    </div>
  );

  return view;
};

// Typechecking
LogoRaw.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }),
};

// Dynamic styling
LogoRaw.styledAs = 'LogoRaw';

export default LogoRaw;
