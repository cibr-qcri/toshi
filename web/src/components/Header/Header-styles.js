// Components
import LogoRaw, { logoStyler } from '../LogoRaw';

// Utils
import { makeStyles, withStyles } from '../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    toolbar: {
      justifyContent: 'space-between',
    },
    link: {
      textDecoration: 'none',
    },
  },
  LogoRaw: {
    ...logoStyler(theme).Default,
    logo: {
      ...logoStyler(theme).Default.logo,
      fontSize: 26,
      // textAlign: 'center',
      // position: 'absolute',
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const Logo = withStyles(stylesCreator, LogoRaw);
