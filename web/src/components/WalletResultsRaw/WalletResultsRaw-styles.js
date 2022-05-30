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
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    labelOptionsContainer: {
      marginTop: 0,
    },
  },
  WalletInfoRaw: walletStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOC
export const WalletInfo = withStyles(stylesCreator, WalletInfoRaw);
