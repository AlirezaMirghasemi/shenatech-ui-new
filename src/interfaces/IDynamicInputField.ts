import { InputType } from "@/constants/data/InputType";

export default interface IDynamicInputField{
    id: string;
  name: string;
  type?: InputType;
  placeholder: string;
  label: string;
  disabled: boolean;
  data?: {id:number, name:string}[];
  className?: string;
  multiple?: boolean;
  defaultValue?: string | number ;
  loading?:boolean;
}
