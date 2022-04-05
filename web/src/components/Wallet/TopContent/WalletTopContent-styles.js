// Utils
import { makeStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    item: {
      padding: theme.spacing(1),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
