export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    button: {
      width: '100%',
      boxShadow: '0px 0px 0px',
      '&:disabled': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.info.contrastText,
      },
      '&:hover': {
        boxShadow: '0px 0px 0px',
      },
    },
  },
});
