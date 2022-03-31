// Utils
import { makeStyles } from "../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "fit-content",
    },
    toggle: {
      height: "35px",
    },
    selected: {
      "&&": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
      "&&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
      },
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
