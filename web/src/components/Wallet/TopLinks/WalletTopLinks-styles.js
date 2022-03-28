// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
      height: "370px",
    },
    header: {
      fontSize: "1rem",
      fontWeight: theme.typography.fontWeightRegular,
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    graph: {
      height: "300px",
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
    },
    empty: {
      height: "100%",
      paddingTop: "140px",
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
