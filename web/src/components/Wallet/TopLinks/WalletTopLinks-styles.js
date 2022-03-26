// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
      marginTop: theme.spacing(2.5),
      height: "350px",
    },
    header: {
      fontSize: "1rem",
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    graph: {
      marginTop: theme.spacing(-1),
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
      maxHeight: "300px",
    },
    empty: {
      height: "100%",
      paddingTop: "140px",
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
