// Components
import WalletInfoRaw, { walletStyler } from '../WalletInfoRaw';

// Utils
import { makeStyles, withStyles } from '../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
    },
    labelContainer: {
      marginTop: theme.spacing(2),
      marginBottm: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  WalletInfoRaw: walletStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOC
export const WalletInfo = withStyles(stylesCreator, WalletInfoRaw);
