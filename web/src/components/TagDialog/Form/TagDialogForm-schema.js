// Yup
import * as yup from "yup";

export const tagDialogFormSchema = yup.object().shape({
  label: yup.string().required(),
  isAbuse: yup.boolean().required(),
  type: yup.string().required(),
  description: yup.string(),
});
