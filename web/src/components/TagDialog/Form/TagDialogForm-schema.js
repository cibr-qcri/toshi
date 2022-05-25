// Yup
import * as yup from 'yup';
import { bitcoinAddressRegexStr } from '../../../utils/common';

export const tagDialogFormSchema = (
  serviceCategoryEnabled,
  darkwebSubcategoryEnabled
) => {
  const validationSchema = yup.object().shape({
    label: yup.string().required(),
    isAbuse: yup.boolean().required(),
    type: yup.string().required(),
    serviceCategory: serviceCategoryEnabled
      ? yup.string().required('category is a required field')
      : yup.string(),
    darkwebSubcategory: darkwebSubcategoryEnabled
      ? yup.string().required('Subcategory is a required field')
      : yup.string(),
    description: yup.string(),
  });
  console.log(validationSchema);
  return validationSchema;
};

export const addressTagDialogFormSchema = (
  serviceCategoryEnabled,
  darkwebSubcategoryEnabled
) => {
  return yup.object().shape({
    address: yup
      .string()
      .required()
      .matches(
        bitcoinAddressRegexStr,
        'address must be a valid Bitcoin identifier'
      ),
    abuser: yup.string().required(),
    type: yup.string().required(),
    serviceCategory: serviceCategoryEnabled
      ? yup.string().required('category is a required field')
      : yup.string(),
    darkwebSubcategory: darkwebSubcategoryEnabled
      ? yup.string().required('Subcategory is a required field')
      : yup.string(),
    description: yup.string(),
  });
};
