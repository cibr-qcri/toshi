// Components
import LazyProgressRaw, { lazyProgressStyler } from '../../../LazyProgressRaw';

// Utils
import { makeStyles, withStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 403,
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1),
    },
    table: {
      width: '100%',
    },
    tableContainer: {
      maxHeight: 318,
      width: '100%',
      alignSelf: 'flex-start',
    },
    tableHead: {
      backgroundColor: theme.palette.background.paper,
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    tableBodyText: {
      color: theme.palette.text.secondary,
    },
    tablePagination: {
      marginTop: theme.spacing(1.5),
      marginRight: '-4px',
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
