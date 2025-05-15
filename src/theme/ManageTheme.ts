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
});
