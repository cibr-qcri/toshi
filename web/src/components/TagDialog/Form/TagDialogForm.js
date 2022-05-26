// React
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Hook Form
import { useForm, Controller } from 'react-hook-form';

// Schema
import {
  addressTagDialogFormSchema,
  tagDialogFormSchema,
} from './TagDialogForm-schema';

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
import { createTag } from '../../../store/actions';

// Styles
import { useStyles } from './TagDialogForm-styles';
import { updateObject } from '../../../utils';

const TagDialogForm = (props) => {
  // Variables
  const { formRef, onClose } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const walletId = useSelector((state) => state.dialog.tag.walletId);
  const isWalletTagging = useSelector(
    (state) => state.dialog.tag.isWalletTagging
  );

  const [abuseChecked, setAbuseChecked] = React.useState(false);
  const initialState = {
    serviceCategoryEnabled: false,
    darkwebSubcategoryEnabled: false,
  };
  const [state, setState] = React.useState(initialState);

  const { register, handleSubmit, errors, control } = useForm({
    validationSchema: isWalletTagging
      ? tagDialogFormSchema(
          state.serviceCategoryEnabled,
          state.darkwebSubcategoryEnabled
        )
      : addressTagDialogFormSchema(
          state.serviceCategoryEnabled,
          state.darkwebSubcategoryEnabled
        ),
  });

  const types = [
    { type: 'user', label: 'User' },
    { type: 'service', label: 'Service' },
  ];

  const serviceCategories = [
    { type: 'wallet', label: 'Cryptocurrency Wallet' },
    { type: 'scam', label: 'Scam' },
    { type: 'pool', label: 'Mining Pool' },
    { type: 'marketplace', label: 'Marketplace' },
    { type: 'gambling', label: 'Gambling' },
    { type: 'exchange', label: 'Cryptocurrency Exchange' },
    { type: 'darkweb', label: 'Darkweb' },
    { type: 'finance', label: 'Finance' },
    { type: 'utility', label: 'Utility' },
    { type: 'tumbler', label: 'Tumbler' },
    { type: 'gateway', label: 'Payment Gateway' },
    { type: 'socialMedia', label: 'Social Media' },
    { type: 'darkwebOther', label: 'Other' },
  ];

  const darkwebSubcategories = [
    { type: 'crypto-service', label: 'Cryptocurrency Service' },
    { type: 'index', label: 'Index, Link list, or similar' },
    { type: 'marketplace', label: 'Marketplace' },
    { type: 'pornography', label: 'Pornography' },
    { type: 'forum', label: 'Forum' },
    { type: 'other', label: 'Other' },
  ];

  // Handlers
  const tagHandler = (tag) => {
    const tagData = {
      ...tag,
      walletId: walletId,
      isWalletTagging: isWalletTagging,
    };
    dispatch(createTag(tagData));
    onClose();
  };

  const handleCheckBoxChange = (event) => {
    setAbuseChecked(event.target.checked);
  };

  const handleChangeState = (event) => {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    if (
      state.serviceCategoryEnabled &&
      eventName === 'serviceCategory' &&
      eventValue === 'scam'
    ) {
      setAbuseChecked(true);
    } else {
      setAbuseChecked(false);
    }

    if (eventValue === 'user') {
      setState(
        updateObject(state, {
          serviceCategoryEnabled: false,
          darkwebSubcategoryEnabled: false,
        })
      );
    } else if (eventValue === 'service') {
      setState(
        updateObject(state, {
          serviceCategoryEnabled: true,
          darkwebSubcategoryEnabled: false,
        })
      );
    } else if (state.serviceCategoryEnabled && eventValue === 'darkweb') {
      setState(
        updateObject(state, {
          darkwebSubcategoryEnabled: true,
        })
      );
    } else if (
      state.serviceCategoryEnabled &&
      eventName === 'serviceCategory' &&
      eventValue !== 'darkweb'
    ) {
      setState(
        updateObject(state, {
          darkwebSubcategoryEnabled: false,
        })
      );
    }
  };

  //JSX
  const getSelection = (data) => {
    return (
      <Select onClick={handleChangeState}>
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

  let type;
  if (isWalletTagging) {
    type = 'wallet';
  } else {
    type = 'incident';
  }

  const view = (
    <form
      className={classes.root}
      ref={formRef}
      onSubmit={handleSubmit(tagHandler)}
    >
      {!isWalletTagging && (
        <TextField
          className={classes.text}
          inputRef={register}
          label="Address"
          name="address"
          variant="standard"
          defaultValue=""
          autoComplete="off"
          error={!!errors.address}
          helperText={errors.address && errors.address.message}
        />
      )}
      {isWalletTagging ? (
        <TextField
          className={classes.text}
          inputRef={register}
          label="Label"
          name="label"
          variant="standard"
          defaultValue=""
          autoComplete="off"
          error={!!errors.label}
          helperText={errors.label && errors.label.message}
        />
      ) : (
        <TextField
          className={classes.text}
          inputRef={register}
          label="Abuser"
          name="abuser"
          placeholder="User, ransomware, marketplace, etc."
          variant="standard"
          defaultValue=""
          autoComplete="off"
          error={!!errors.abuser}
          helperText={errors.abuser && errors.abuser.message}
        />
      )}

      <FormControl className={classes.select} error={!!errors.type}>
        <InputLabel>Type</InputLabel>
        <Controller
          as={getSelection(types)}
          name="type"
          control={control}
          defaultValue=""
        />
        <FormHelperText>{errors.type && errors.type.message}</FormHelperText>
      </FormControl>
      {state.serviceCategoryEnabled && (
        <FormControl
          className={classes.select}
          error={!!errors.serviceCategory}
        >
          <InputLabel>Category</InputLabel>
          <Controller
            as={getSelection(serviceCategories)}
            name="serviceCategory"
            control={control}
            defaultValue=""
          />
          <FormHelperText>
            {errors.serviceCategory && errors.serviceCategory.message}
          </FormHelperText>
        </FormControl>
      )}
      {state.darkwebSubcategoryEnabled && (
        <FormControl
          className={classes.select}
          error={!!errors.darkwebSubcategory}
        >
          <InputLabel>Subcategory</InputLabel>
          <Controller
            as={getSelection(darkwebSubcategories)}
            name="darkwebSubcategory"
            control={control}
            defaultValue=""
          />
          <FormHelperText>
            {errors.darkwebSubcategory && errors.darkwebSubcategory.message}
          </FormHelperText>
        </FormControl>
      )}
      {isWalletTagging && (
        <FormControlLabel
          className={classes.checkbox}
          control={
            <Checkbox
              name="isAbuse"
              color="default"
              inputRef={register}
              checked={abuseChecked}
              onChange={handleCheckBoxChange}
            />
          }
          label={
            'This ' + type + ' is associated with an abuse (e.g., ransomware)'
          }
        />
      )}
      <TextField
        className={classes.text}
        inputRef={register}
        label="Description"
        name="description"
        placeholder={
          '(Optional) Provide additional info about the ' +
          type +
          ', such as URLs, abuse details, etc.'
        }
        variant="outlined"
        defaultValue=""
        maxRows={3}
        minRows={3}
        multiline
        error={!!errors.description}
        helperText={errors.description && errors.description.message}
      />
    </form>
  );

  return view;
};

export default TagDialogForm;
