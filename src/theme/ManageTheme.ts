import { createTheme } from "flowbite-react";
import { ButtonThemeConfig } from "./ButtonThemeConfig";
import { SidebarThemeConfig } from "./SidebarThemeConfig";
import { DrawerThemeConfig } from "./DrawerThemeConfig";
import { TableThemeConfig } from "./TableThemeConfig";
import { ModalThemeConfig } from "./ModalThemeConfig";
import { AlertThemeConfig } from "./AlertThemeConfig";
import { TextInputThemeConfig } from "./TextInputTheme";
import { LabelThemeConfig } from "./LabelThemeConfig";
import { SpinnerThemeConfig } from "./SpinnerThemeConfig";
import { DropdownThemeConfig } from "./DropdownThemeConfig";
import { PaginationThemeConfig } from "./PaginationThemeConfig";
import { SelectInputThemeConfig } from "./SelectInputTheme";
import{TabsThemeConfig}from "./TabsThemeConfig"
import { BadgeThemeConfig } from "./BadgeThemeConfig";

export const ManageTheme = createTheme({
  button: { ...ButtonThemeConfig },
  sidebar: { ...SidebarThemeConfig },
  drawer: { ...DrawerThemeConfig },
  table: { ...TableThemeConfig },
  modal: { ...ModalThemeConfig },
  alert: { ...AlertThemeConfig },
  textInput: { ...TextInputThemeConfig },
  label: { ...LabelThemeConfig },
  spinner: { ...SpinnerThemeConfig },
  dropdown: { ...DropdownThemeConfig },
  pagination:{...PaginationThemeConfig},
  select:{... SelectInputThemeConfig},
  tabs:{...TabsThemeConfig},
  badge:{...BadgeThemeConfig}
});
