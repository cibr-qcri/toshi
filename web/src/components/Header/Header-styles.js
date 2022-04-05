// Components
import LogoRaw, { logoStyler } from "../LogoRaw";

// Utils
import { makeStyles, withStyles } from "../../utils";

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    toolbar: {
      justifyContent: "space-between",
    },
    link: {
      textDecoration: "none",
    },
  },
  LogoRaw: {
    ...logoStyler(theme).Default,
    logo: {
      ...logoStyler(theme).Default.logo,
      fontSize: 26
    }
  }
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const Logo = withStyles(stylesCreator, LogoRaw);
