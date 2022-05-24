// Components
import LazyProgressRaw, { lazyProgressStyler } from '../LazyProgressRaw';
import SwitcherRaw, { switcherStyler } from '../SwitcherRaw';
import NoResultsRaw, { noResultsStyler } from '../NoResultsRaw';
import WalletResultsRaw, { walletResultsStyler } from '../WalletResultsRaw';

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
  SwitcherRaw: {
    ...switcherStyler(theme).Default,
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: '100%',
    },
  },
  WalletResultsRaw: walletResultsStyler(theme).Default,
  NoResultsRaw: noResultsStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const LazyProgress = withStyles(stylesCreator, LazyProgressRaw);
export const Switcher = withStyles(stylesCreator, SwitcherRaw);
export const NoResults = withStyles(stylesCreator, NoResultsRaw);
export const WalletResults = withStyles(stylesCreator, WalletResultsRaw);
