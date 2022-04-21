// Utils
import { makeStyles } from '../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      marginTop: theme.spacing(2),
      textAlign: 'justify',
    },
    title: {
      textAlign: 'center',
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
