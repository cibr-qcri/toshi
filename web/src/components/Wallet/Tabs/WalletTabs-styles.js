// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
      paddingTop: theme.spacing(2),
    },
    tab: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
