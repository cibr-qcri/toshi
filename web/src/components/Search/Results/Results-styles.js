// Components
import WalletInfoRaw, { walletStyler } from '../../WalletInfoRaw';

// Utils
import { makeStyles, withStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
    },
    list: {},
  },
  WalletInfoRaw: walletStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOC
export const WalletInfo = withStyles(stylesCreator, WalletInfoRaw);
