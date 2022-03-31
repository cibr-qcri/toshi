// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(3),
      height: "440px",
    },
    container: {
      height: "94%",
    },
    tableBodyText: {
      color: theme.palette.text.secondary,
    },
    progress: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
