// Components
import LazyProgressRaw, { lazyProgressStyler } from "../LazyProgressRaw";
import WalletInfoRaw, { walletStyler } from "../WalletInfoRaw";
import NoResultsRaw, { noResultsStyler } from "../NoResultsRaw";

// Utils
import { makeStyles, withStyles } from "../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
      padding: theme.spacing(1),
    },
    grid: {
      marginTop: theme.spacing(1.5),
    },
    paper: {
      display: "block",
      width: "100%",
      marginTop: theme.spacing(2.5),
    },
  },
  LazyProgressRaw: lazyProgressStyler(theme).Default,
  WalletInfoRaw: walletStyler(theme).Default,
  NoResultsRaw: noResultsStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const LazyProgress = withStyles(stylesCreator, LazyProgressRaw);
export const WalletInfo = withStyles(stylesCreator, WalletInfoRaw);
export const NoResults = withStyles(stylesCreator, NoResultsRaw);
