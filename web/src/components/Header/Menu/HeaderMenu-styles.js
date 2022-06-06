// Utils
import { makeStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    drawer: {},
    drawerNote: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: '100%',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
