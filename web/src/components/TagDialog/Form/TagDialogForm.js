// React
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

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
  const pageId = useSelector((state) => state.dialog.tag.pageId);
  const { formRef, onClose } = props;
  const { register, handleSubmit, errors, control } = useForm({
    validationSchema: tagDialogFormSchema,
  });
  const initialState = {
    serviceTypeEnabled: false,
    darkwebServiceEnabled: false,
    otherInputEnabled: false,
    darkwebOtherInputEnabled: false,
  };
  const [state, setState] = React.useState(initialState);

  const safety = [
    { type: 'benign', label: 'Benign' },
    { type: 'malicious', label: 'Malicious' },
  ];

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
    { type: 'blacklist', label: 'Blacklist'},
    { type: 'socialMedia', label: 'Social Media'},
    { type: 'darkwebOther', label: 'Other' }
  ];

  const darkwebCategories = [
    { type: 'crypto-service', label: 'Cryptocurrency service' },
    { type: 'index', label: 'Index, link list, or similar' },
    { type: 'marketplace', label: 'Marketplace' },
    { type: 'pornography', label: 'Pornography' },
    { type: 'forum', label: 'Forum' },
    { type: 'other', label: 'Other' }
  ];

  // Handlers
  const tagHandler = (tag) => {
    const tagData = { ...tag, page: pageId };
    dispatch(createTag(tagData));
    onClose();
  };

  const handleChange = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value
    if (eventValue === "user") {
      setState(updateObject(state, {
        serviceTypeEnabled: false,
        darkwebServiceEnabled: false,
        otherInputEnabled: false,
        darkwebOtherInputEnabled: false,
      }));
    } else if (eventValue === "service") {
      setState(updateObject(state, {
        serviceTypeEnabled: true,
        darkwebServiceEnabled: false,
        otherInputEnabled: false,
        darkwebOtherInputEnabled: false,
      }));
    } else if (state.serviceTypeEnabled && eventValue === "darkweb") {
      setState(updateObject(state, {
        darkwebServiceEnabled: true,
        otherInputEnabled: false,
        darkwebOtherInputEnabled: false,
      }));
    } else if (eventValue === "other") {
      setState(updateObject(state, {
        otherInputEnabled: true,
        darkwebServiceEnabled: false,
        darkwebOtherInputEnabled: false,
      }));
    } else if (state.otherInputEnabled && eventValue !== "other") {
      setState(updateObject(state, {
        otherInputEnabled: false,
      }));
    } else if (eventValue === "darkwebOther") {
      setState(updateObject(state, {
        darkwebOtherInputEnabled: true,
        otherInputEnabled: false,
      }));
    } else if (state.serviceTypeEnabled && eventName === "serviceType" && eventValue !== "darkweb") {
      setState(updateObject(state, {
        darkwebServiceEnabled: false,
        darkwebOtherInputEnabled: false,
      }));
    }
  };

  //JSX
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
        label="Name"
        name="name"
        placeholder="Wallet Name"
        variant="standard"
        defaultValue=""
      />
      <FormControl className={classes.select} error={!!errors.safety}>
        <InputLabel>Safety</InputLabel>
        <Controller
          as={getSelection(safety)}
          name="safety"
          control={control}
          defaultValue=""
        />
        <FormHelperText>
          {errors.safety && errors.safety.message}
        </FormHelperText>
      </FormControl>
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
          <InputLabel>Service Category</InputLabel>
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
        state.otherInputEnabled &&
        <TextField
          className={classes.text}
          inputRef={register}
          label="Please Specify"
          name="other"
          variant="standard"
          defaultValue=""
        />
      }
      {
        state.darkwebServiceEnabled &&
        <FormControl className={classes.select} error={!!errors.category}>
          <InputLabel>Darkweb Category</InputLabel>
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
      {
        state.darkwebOtherInputEnabled &&
        <TextField
          className={classes.text}
          inputRef={register}
          label="Please Specify"
          name="darkwebOther"
          variant="standard"
          defaultValue=""
        />
      }
      <TextField
        className={classes.text}
        inputRef={register}
        label="Comments"
        name="comments"
        placeholder="Optional"
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
