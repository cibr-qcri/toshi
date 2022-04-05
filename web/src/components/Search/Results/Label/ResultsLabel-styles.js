// Utils
import { makeStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
    },
    label: {
      paddingLeft: theme.spacing(4.5),
      paddingRight: theme.spacing(4.5),
      fontSize: 15,
      paddingTop: theme.spacing(4),
      marginBottom: theme.spacing(0),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
