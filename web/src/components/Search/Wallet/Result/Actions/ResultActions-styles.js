// Utils
import { makeStyles } from "../../../../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    walletFlow: {
      display: "flex",
      alignItems: "center",
    },
    walletMetadataLabel: {
      marginLeft: theme.spacing(1),
      width: "fit-content",
      "&:hover": {
        textDecoration: "none",
        cursor: "pointer",
      },
    },
    walletFlowInIcon: {
      fontSize: "1.75rem",
    },
    walletFlowOutIcon: {
      fontSize: "1.75rem",
      transform: "rotate(180deg)",
    },
    CardAction: {
      display: "flex",
      justifyContent: "space-between",
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
