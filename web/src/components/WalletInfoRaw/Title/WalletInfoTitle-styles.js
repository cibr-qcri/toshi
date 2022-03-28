// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
    },
    typography: {
      textAlign: "left",
    },
    link: {
      width: "fit-content",
      "&:hover": {
        textDecoration: "none",
        cursor: "pointer",
      },
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
