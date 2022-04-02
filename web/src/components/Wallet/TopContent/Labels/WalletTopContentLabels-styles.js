// Utils
import { makeStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      height: 370,
      marginTop: theme.spacing(1),
    },
    header: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      paddingTop: theme.spacing(2.5),
    },
    content: {
      paddingTop: theme.spacing(1.5),
      paddingRight: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
      paddingBottom: theme.spacing(2),
      height: 324,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:last-child': {
        paddingBottom: theme.spacing(1.5),
      },
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
