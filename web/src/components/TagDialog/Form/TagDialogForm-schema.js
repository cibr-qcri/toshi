// Yup
import * as yup from "yup";

export const tagDialogFormSchema = yup.object().shape({
  name: yup.string(),
  safety: yup.string().required(),
  type: yup.string().required(),
  comments: yup.string(),
});
