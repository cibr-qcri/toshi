// React
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material
import {
  FormControl,
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
import { setSortBy } from '../../store/actions/search/creators';
import { getResults, getTopWalletResults } from '../../store/actions';

export const WalletResults = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.search.data.sortBy);
  const query = useSelector((state) => state.search.data.query);
  const { isTopWalletSearch = false } = props;

  const handleChange = (event) => {
    dispatch(setSortBy(event.target.value));
    if (isTopWalletSearch) {
      dispatch(getTopWalletResults());
    } else {
      dispatch(getResults(query));
    }
  };

  const sortByComponent = (
    <FormControl className={classes.formControl}>
      <InputLabel id="sort-by">{ isTopWalletSearch ? "Rank by" : "Sort by" }</InputLabel>
      <Select
        labelId="sort-by"
        value={sortBy}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="riskScore">Risk Score</MenuItem>
        <MenuItem value="volume">Volume</MenuItem>
        <MenuItem value="size">Size</MenuItem>
      </Select>
    </FormControl>
  );

  // JSX
  const final = (
    <div className={classes.root}>
      <div className={classes.labelContainer}>
        <Label
          count={props.count}
          type={props.type}
          isTopWalletSearch={isTopWalletSearch}
        />
        {sortByComponent}
      </div>

      <List component="ul" aria-label="search results" className={classes.list}>
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
