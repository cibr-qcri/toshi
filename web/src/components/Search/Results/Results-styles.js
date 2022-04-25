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
    formControl: {
      minWidth: 120,
      marginLeft: theme.spacing(1),
    },
    labelContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(2),
    },
  },
  WalletInfoRaw: walletStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOC
export const WalletInfo = withStyles(stylesCreator, WalletInfoRaw);
