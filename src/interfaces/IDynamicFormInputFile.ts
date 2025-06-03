import { DataStatus } from "@/constants/data/DataStatus";
import IDynamicInputField from "./IDynamicInputField";

export interface IDynamicFormInputFile<T> {
  loading?: DataStatus;
  fileInputFieldName: keyof T;
  dynamicInputFieldProps: IDynamicInputField;
}
