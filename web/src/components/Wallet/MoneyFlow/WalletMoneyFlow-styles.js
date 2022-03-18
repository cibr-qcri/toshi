// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
      height: "90%",
      display: "block",
      alignItems: "center",
      justifyContent: "center",
    },
    typography: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(2),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
