// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
      marginTop: theme.spacing(2.5),
      height: '350px',
    },
    header: {
      fontSize: "1rem",
      fontWeight: theme.typography.fontWeightRegular,
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    graph: {
      marginTop: theme.spacing(-1),
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
    },
    empty: {
      height: "100%",
      marginTop: "60px",
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
