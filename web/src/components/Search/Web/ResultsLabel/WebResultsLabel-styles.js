// Utils
import { makeStyles } from "../../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: "100%",
    },
    label: {
      paddingLeft: theme.spacing(2),
      fontSize: 15,
      paddingTop: theme.spacing(2),
      marginBottom: theme.spacing(-1),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
