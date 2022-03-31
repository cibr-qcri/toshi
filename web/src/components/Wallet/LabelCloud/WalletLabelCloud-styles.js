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
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      paddingTop: theme.spacing(2.5),
    },
    cardBody: {
      paddingTop: theme.spacing(1.5),
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
      height: "325px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
