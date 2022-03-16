// React
import React from "react";

// Material
import { Divider, Grid, Typography } from "@material-ui/core";

// Styles
import { useStyles } from "./ResultInfo-styles";

const ResultInfo = (props) => {
  // Variables
  const classes = useStyles();
  const { items } = props;

  //JSX
  const infoItems = items.map((info, index) => {
    return (
      <Grid className={classes.item} key={index} item xs={12} sm={6}>
        <Typography variant="body2">{info.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {info.text}
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
    );
  });

  const view = (
    <div className={classes.root}>
        <Grid className={classes.content} container>
            {infoItems}
        </Grid>
    </div>
  );

  return view;
};

export default ResultInfo;
