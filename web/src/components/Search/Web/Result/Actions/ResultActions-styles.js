// Utils
import { makeStyles } from "../../../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    walletIcon: {
    },
    CardAction: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: theme.spacing(2),
    }
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
