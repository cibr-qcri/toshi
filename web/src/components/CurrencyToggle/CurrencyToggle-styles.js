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
      "&&, &&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: "#ffffff",
      },
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
