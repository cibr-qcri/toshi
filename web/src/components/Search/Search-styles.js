// Components
import LazyProgressRaw, { lazyProgressStyler } from '../LazyProgressRaw';
import SearchBoxRaw, { searchBoxStyler } from '../SearchBoxRaw';
import SwitcherRaw, { switcherStyler } from '../SwitcherRaw';
import NoResultsRaw, { noResultsStyler } from '../NoResultsRaw';

// Utils
import { makeStyles, withStyles } from '../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: theme.spacing(2),
    },
  },
  LazyProgressRaw: lazyProgressStyler(theme).Default,
  SearchBoxRaw: {
    ...searchBoxStyler(theme).Default,
    root: {
      ...searchBoxStyler(theme).Default.root,
      maxWidth: 'none',
    },
  },
  SwitcherRaw: {
    ...switcherStyler(theme).Default,
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: '100%',
    },
  },
  NoResultsRaw: noResultsStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const LazyProgress = withStyles(stylesCreator, LazyProgressRaw);
export const SearchBox = withStyles(stylesCreator, SearchBoxRaw);
export const Switcher = withStyles(stylesCreator, SwitcherRaw);
export const NoResults = withStyles(stylesCreator, NoResultsRaw);
