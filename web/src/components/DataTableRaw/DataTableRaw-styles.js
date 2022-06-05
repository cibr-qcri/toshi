// Components
import LazyProgressRaw, { lazyProgressStyler } from '../LazyProgressRaw';

// Utils
import { makeStyles, withStyles } from '../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 403,
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1),
    },
    table: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    tableContainer: {
      maxHeight: 318,
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
    infoItem: {
      display: 'flex',
      alignItems: 'center',
    },
    infoIcon: {
      marginLeft: theme.spacing(0.5),
      fontSize: '0.875rem',
    },
    tablePagination: {
      marginTop: theme.spacing(1.5),
      marginRight: '-4px',
      alignSelf: 'flex-end',
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
