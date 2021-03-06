// Utils
import { makeStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    label: {
      fontSize: 15,
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
