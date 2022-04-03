// Components
import DataTableRaw, { dataTableStyler } from '../../../DataTableRaw';

// Utils
import { makeStyles, withStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
  },
  DataTableRaw: dataTableStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const DataTable = withStyles(stylesCreator, DataTableRaw);
