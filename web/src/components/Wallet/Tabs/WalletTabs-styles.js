// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
      paddingTop: theme.spacing(2),
      marginTop: theme.spacing(2.5),
    },
    tab: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
    },
    paper: {
      display: "block",
      width: "100%",
      transitionDuration: "0.3s",
      height: "500px",
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
