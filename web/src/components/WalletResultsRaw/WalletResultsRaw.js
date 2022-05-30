// React
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material
import {
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
} from '@material-ui/core';

// Componets
import Label from './Label';

// Styles
import { useStyles, WalletInfo } from './WalletResultsRaw-styles';

// Actions
import { setOrder, setSortBy } from '../../store/actions/search/creators';
import { getResults, getTopWalletResults } from '../../store/actions';

export const WalletResults = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.data.sortBy);
  const order = useSelector((state) => state.search.data.order);
  const query = useSelector((state) => state.search.data.query);
  const { isTopWalletSearch = false } = props;

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
    if (isTopWalletSearch) {
      dispatch(getTopWalletResults());
    } else {
      dispatch(getResults(query));
    }
  };

  const handleOrderChange = (event) => {
    dispatch(setOrder(event.target.value));
    if (isTopWalletSearch) {
      dispatch(getTopWalletResults());
    } else {
      dispatch(getResults(query));
    }
  };

  const sortByComponent = (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel id="sort-by">
        {isTopWalletSearch ? 'Rank by' : 'Sort by'}
      </InputLabel>
      <Select
        labelId="sort-by"
        value={sortBy}
        onChange={handleSortChange}
        displayEmpty
      >
        <MenuItem value="riskScore">Risk Score</MenuItem>
        <MenuItem value="size">Size</MenuItem>
        <MenuItem value="volume">Volume</MenuItem>
        <MenuItem value="btcBalance">Balance</MenuItem>
      </Select>
    </FormControl>
  );

  const orderComponent = (
    <FormControl fullWidth>
      <InputLabel id="order-by">Order</InputLabel>
      <Select labelId="order-by" value={order} onChange={handleOrderChange}>
        <MenuItem value="DESC">Decsending</MenuItem>
        <MenuItem value="ASC">Ascending</MenuItem>
      </Select>
    </FormControl>
  );

  let rankingComponent = (
    <Grid
      className={classes.labelOptionsContainer}
      container
      item
      direction="row"
      justifyContent="space-between"
      spacing={2}
      sm={4}
    >
      <Grid item xs={12} sm={6}>
        {sortByComponent}
      </Grid>
      <Grid item xs={12} sm={6}>
        {orderComponent}
      </Grid>
    </Grid>
  );

  if (isTopWalletSearch) {
    rankingComponent = (
      <Grid
        className={classes.labelOptionsContainer}
        container
        item
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
        sm={4}
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          {sortByComponent}
        </Grid>
      </Grid>
    );
  }

  // JSX
  const final = (
    <div className={classes.root}>
      <Grid
        className={classes.labelContainer}
        container
        alignItems="flex-end"
        justifyContent="flex-start"
      >
        <Grid item sm={8}>
          <Label
            count={props.count}
            type={props.type}
            isTopWalletSearch={isTopWalletSearch}
          />
        </Grid>
        {rankingComponent}
      </Grid>

      <List component="ul" aria-label="search results">
        {props.items.map((result) => {
          return (
            <ListItem key={result._id}>
              <WalletInfo
                id={result._id}
                info={result.info}
                moneyFlow={result.moneyFlow}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return final;
};

export default WalletResults;
