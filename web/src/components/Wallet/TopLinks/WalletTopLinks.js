// React
import React from 'react';

// Material
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Styles
import { useStyles } from './WalletTopLinks-styles';
//import Info from "../../Search/Wallet/Result/Info/ResultInfo";

export const WalletTopLinks = (props) => {
  // Variables
  const classes = useStyles();
  let { links } = props;

  //JSX
  let topLinks;
  if (links.length > 0) {
    topLinks = links.map((link, index) => {
      const id = link.id;
      return (
        <Grid className={classes.item} key={index} item xs={12} sm={6}>
          <Accordion variant="outlined" className={classes.typography}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={index}
            >
              <Link
                className={classes.link}
                href={'/wallet?id=' + id}
                target="_blank"
                rel="noopener"
              >
                Wallet [{id.split('-')[0]}]
              </Link>
            </AccordionSummary>
            {/* <AccordionDetails>
              <Info items={link.data} />
            </AccordionDetails> */}
          </Accordion>
        </Grid>
      );
    });
  } else {
    topLinks = (
      <Grid className={classes.item} item xs={12} sm={6}>
        <Typography className={classes.typography}>No data</Typography>
      </Grid>
    );
  }

  const view = (
    <Card variant="outlined">
      <CardHeader
        title="Top Connected Wallets"
        className={classes.cardHeader}
        titleTypographyProps={{ variant: 'h6' }}
      />
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
