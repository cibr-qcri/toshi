// React
import React from "react";

// Material
import {
  CardActions,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { Card, CardContent, CardHeader } from "@material-ui/core";

// Styles
import { useStyles } from "./WalletSummary-styles";

export const WalletSummary = (props) => {
  // Variables
  const classes = useStyles();
  let { summary, labels } = props;

  //JSX
  const summaryItems = summary.map((info, index) => {
    return (
      <Grid className={classes.item} key={index} item xs={12} sm={6}>
        <Typography variant="body2">{info.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {info.value}
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
    );
  });

  let labelsItems = null;
  if (labels.length > 0) {
    labelsItems = (
      <div className={classes.action}>
        <Grid className={classes.labels} item xs={12} sm={12}>
          <Typography variant="body2">Reported Labels</Typography>
          {labels.map((item, index) => {
            return (
              <Chip
                className={classes.chips}
                variant="outlined"
                color="primary"
                size="small"
                key={index}
                label={item}
              />
            );
          })}
        </Grid>
      </div>
    );
  }

  const view = (
    <Card variant="outlined">
      <CardHeader title="Wallet Summary" className={classes.cardHeader} titleTypographyProps={{ variant:'h6' }} />
      <CardContent>
        <Grid className={classes.content} container>
          {summaryItems}
        </Grid>
      </CardContent>
      <CardActions>
        {labelsItems}
      </CardActions>
    </Card>
  );

  return view;
};

export default WalletSummary;
