// Components
import LazyProgressRaw, { lazyProgressStyler } from '../LazyProgressRaw';
import WalletInfoRaw, { walletStyler } from '../WalletInfoRaw';
import NoResultsRaw, { noResultsStyler } from '../NoResultsRaw';

// Utils
import { makeStyles, withStyles } from '../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      padding: theme.spacing(1),
      paddingTop: 0,
    },
    content: {
      marginBottom: theme.spacing(2),
    },
  },
  LazyProgressRaw: lazyProgressStyler(theme).Default,
  WalletInfoRaw: {
    ...walletStyler(theme).Default,
    root: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  NoResultsRaw: noResultsStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const LazyProgress = withStyles(stylesCreator, LazyProgressRaw);
export const WalletInfo = withStyles(stylesCreator, WalletInfoRaw);
export const NoResults = withStyles(stylesCreator, NoResultsRaw);
