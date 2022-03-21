// Utils
import { makeStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      paddingTop: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
    },
    typography: {},
    link: {
      width: 'fit-content',
      '&:hover': {
        textDecoration: 'none',
        cursor: 'pointer',
      },
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
