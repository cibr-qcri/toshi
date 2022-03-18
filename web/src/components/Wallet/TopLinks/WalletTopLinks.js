// React
import React from "react";

// Material
import { Grid, Link, Typography } from "@material-ui/core";
import { Card, CardContent, CardHeader } from "@material-ui/core";

// Styles
import { useStyles } from "./WalletTopLinks-styles";


export const WalletTopLinks = (props) => {
  // Variables
  const classes = useStyles();
  let { links } = props;

  //JSX
  let topLinks;
  if (links.length > 0) {
    topLinks = links.map((link, index) => {
      const id = link.id;
      const url = "/info/wallet?id=" + id;
      return (
        <Grid className={classes.item} key={index} item xs={12} sm={6}>
          <Typography className={classes.typography}>
            <Link
              className={classes.link}
              href={url}
              target="_blank"
              rel="noopener"
            >
              {id}
            </Link>
          </Typography>
        </Grid>
      );
    });
  } else {
    topLinks = (
      <Grid className={classes.item} item xs={12} sm={6}>
        <Typography className={classes.typography}>
          No data
        </Typography>
      </Grid>
    );
  }


  const view = (
      <Card variant="outlined">
        <CardHeader title="Top Connected Wallets" className={classes.cardHeader} titleTypographyProps={{ variant:'h6' }} />
        <CardContent>
          <Grid className={classes.content} container>
            {topLinks}
          </Grid>
        </CardContent>
      </Card>
  );

  return view;
};

export default WalletTopLinks;
