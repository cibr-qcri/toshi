// Utils
import { makeStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      marginBottom: theme.spacing(2),
    },
    typography: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
