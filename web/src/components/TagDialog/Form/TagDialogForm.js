// React
import React from 'react';

// Redux
import {useDispatch, useSelector} from 'react-redux';

// Hook Form
import { useForm, Controller } from 'react-hook-form';

// Schema
import { tagDialogFormSchema } from './TagDialogForm-schema';

// Material
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

// Store
import {
  createTag,
} from '../../../store/actions';

// Styles
import { useStyles } from './TagDialogForm-styles';
import {updateObject} from "../../../utils";

const TagDialogForm = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { formRef, onClose } = props;
  const walletId = useSelector((state) => state.dialog.tag.walletId);
  const [abuseChecked, setAbuseChecked] = React.useState(false);
  const { register, handleSubmit, errors, control } = useForm({
    validationSchema: tagDialogFormSchema,
  });
  const initialState = {
    serviceTypeEnabled: false,
    darkwebServiceEnabled: false,
  };
  const [state, setState] = React.useState(initialState);

  const types = [
    { type: 'user', label: 'User'},
    { type: 'service', label: 'Service'},
  ];

  const serviceTypes = [
    { type: 'wallet', label: 'Cryptocurrency Wallet'},
    { type: 'scam', label: 'Scam'},
    { type: 'pool', label: 'Mining Pool'},
    { type: 'marketplace', label: 'Marketplace'},
    { type: 'gambling', label: 'Gambling'},
    { type: 'exchange', label: 'Cryptocurrency Exchange'},
    { type: 'darkweb', label: 'Darkweb'},
    { type: 'finance', label: 'Finance'},
    { type: 'utility', label: 'Utility'},
    { type: 'tumbler', label: 'Tumbler'},
    { type: 'gateway', label: 'Payment Gateway'},
    { type: 'socialMedia', label: 'Social Media'},
    { type: 'darkwebOther', label: 'Other' }
  ];

  const darkwebCategories = [
    { type: 'crypto-service', label: 'Cryptocurrency Service' },
    { type: 'index', label: 'Index, Link list, or similar' },
    { type: 'marketplace', label: 'Marketplace' },
    { type: 'pornography', label: 'Pornography' },
    { type: 'forum', label: 'Forum' },
    { type: 'other', label: 'Other' }
  ];

  // Handlers
  const tagHandler = (tag) => {
    const tagData = { ...tag, walletId: walletId };
    dispatch(createTag(tagData));
    onClose();
  };

  const handleChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value

    if (state.serviceTypeEnabled && eventName === "serviceType" && eventValue === "scam") {
      setAbuseChecked(true);
    } else {
      setAbuseChecked(false);
    }

    if (eventValue === "user") {
      setState(updateObject(state, {
        serviceTypeEnabled: false,
        darkwebServiceEnabled: false,
      }));
    } else if (eventValue === "service") {
      setState(updateObject(state, {
        serviceTypeEnabled: true,
        darkwebServiceEnabled: false,
      }));
    } else if (state.serviceTypeEnabled && eventValue === "darkweb") {
      setState(updateObject(state, {
        darkwebServiceEnabled: true,
      }));
    } else if (state.serviceTypeEnabled && eventName === "serviceType" && eventValue !== "darkweb") {
      setState(updateObject(state, {
        darkwebServiceEnabled: false,
      }));
    }
  };

  //JSX1
  const getSelection = (data) => {
    return (
      <Select onClick={handleChange}>
        {data.map((item, index) => {
          return (
            <MenuItem key={index} value={item.type}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  const view = (
    <form
      className={classes.root}
      ref={formRef}
      onSubmit={handleSubmit(tagHandler)}
    >
      <TextField
        className={classes.text}
        inputRef={register}
        label="Label"
        name="label"
        variant="standard"
        defaultValue=""
      />
      <FormControl className={classes.select} error={!!errors.category}>
        <InputLabel>Type</InputLabel>
        <Controller
          as={getSelection(types)}
          name="type"
          control={control}
          defaultValue=""
        />
        <FormHelperText>
          {errors.category && errors.category.message}
        </FormHelperText>
      </FormControl>
      {
        state.serviceTypeEnabled &&
        <FormControl className={classes.select} error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Controller
            as={getSelection(serviceTypes)}
            name="serviceType"
            control={control}
            defaultValue=""
          />
          <FormHelperText>
            {errors.category && errors.category.message}
          </FormHelperText>
        </FormControl>
      }
      {
        state.darkwebServiceEnabled &&
        <FormControl className={classes.select} error={!!errors.category}>
          <InputLabel>Subcategory</InputLabel>
          <Controller
            as={getSelection(darkwebCategories)}
            name="darkwebCategory"
            control={control}
            defaultValue=""
          />
          <FormHelperText>
            {errors.category && errors.category.message}
          </FormHelperText>
        </FormControl>
      }
      <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            name="isAbuse"
            color="default"
            inputRef={register}
            checked={abuseChecked}
          />
        }
        label="This wallet is associated with an abuse (e.g., ransomware)"
      />
      <TextField
        className={classes.text}
        inputRef={register}
        label="Description"
        name="description"
        placeholder="(Optional) Provide additional info about the wallet, such as URLs, abuse details, etc."
        variant="outlined"
        defaultValue=""
        maxRows={3}
        minRows={3}
        multiline
      />
    </form>
  );

  return view;
};

export default TagDialogForm;
