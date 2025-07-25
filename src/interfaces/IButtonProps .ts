import { JSX } from "react";

export interface IButtonProps<T extends object> {
  name: string;
  icon?:JSX.Element;
  color?: string;
  className?: string;
  disabled?: boolean | ((data:T) => boolean);
  hidden?: boolean | ((data:T) => boolean);
}
