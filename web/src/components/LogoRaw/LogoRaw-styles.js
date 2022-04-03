export const stylesCreator = (theme) => ({
  Default: {
    root: {
      margin: theme.spacing(2),
    },
    link: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
    logo: {
      fontFamily: 'ubuntu',
      lineHeight: 0.9,
      fontSize: 100,
    },
  },
});
