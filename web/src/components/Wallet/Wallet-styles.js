// Components
import LazyProgressRaw, { lazyProgressStyler } from '../LazyProgressRaw';
import WalletInfoRaw, { walletStyler } from '../WalletInfoRaw';

// Utils
import { makeStyles, withStyles } from '../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(2.5),
      display: 'block',
      width: '100%',
      transitionDuration: '0.3s',
      height: '500px',
    },
  },
  LazyProgressRaw: lazyProgressStyler(theme).Default,
  WalletInfoRaw: walletStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const LazyProgress = withStyles(stylesCreator, LazyProgressRaw);
export const WalletInfo = withStyles(stylesCreator, WalletInfoRaw);
