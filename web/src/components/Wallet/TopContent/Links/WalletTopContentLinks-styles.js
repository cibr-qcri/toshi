// Components
import LazyProgressRaw, { lazyProgressStyler } from '../../../LazyProgressRaw';

// Utils
import { makeStyles, withStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      height: 370,
      marginTop: theme.spacing(1),
    },
    header: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      paddingTop: theme.spacing(2.5),
    },
    content: {
      paddingTop: theme.spacing(1.5),
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
      paddingBottom: theme.spacing(2),
      height: 324,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:last-child': {
        paddingBottom: theme.spacing(1.5),
      },
    },
  },
  LazyProgressRaw: {
    ...lazyProgressStyler(theme).Default,
    root: {
      top: '50%',
      left: '50%',
      textAlign: 'center',
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const LazyProgress = withStyles(stylesCreator, LazyProgressRaw);
