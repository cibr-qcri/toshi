// Utils
import { makeStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
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
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
