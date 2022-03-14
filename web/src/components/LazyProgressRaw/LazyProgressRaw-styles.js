export const stylesCreator = (theme) => ({
  Default: {
    root: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
  },
  LoadingLabel: {
    marginTop: theme.spacing(2),
  },
});
