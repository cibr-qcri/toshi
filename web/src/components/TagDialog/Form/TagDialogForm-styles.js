// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      display: "flex",
      flexDirection: "column",
    },
    scrollable: {
      display: "flex",
      flexDirection: "column",
      overflow: 'auto',
    },
    select: {
      marginBottom: theme.spacing(1),
    },
    text: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
