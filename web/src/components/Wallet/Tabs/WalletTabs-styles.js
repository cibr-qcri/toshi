// Utils
import { makeStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    tab: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
    },
    tabs: {
      paddingTop: theme.spacing(1.75),
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
    },
    paper: {
      display: 'block',
      width: '100%',
      transitionDuration: '0.3s',
      height: '500px',
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
