// Utils
import { makeStyles } from "../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    action: {
      width: "100%",
      display: "flex",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    labels: {
      marginTop: theme.spacing(-2.5),
    },
    chips: {
      marginTop: theme.spacing(0.4),
      marginRight: theme.spacing(0.4),
      width: "fit-content",
      "&:hover": {
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    cardHeader: {
      paddingBottom: theme.spacing(0),
    },
    content: {
      paddingTop: theme.spacing(1.5),
    },
    item: {
      paddingTop: theme.spacing(0.5),
    },
    divider: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
