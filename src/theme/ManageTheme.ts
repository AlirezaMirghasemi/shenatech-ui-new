import { createTheme } from "flowbite-react";
import { ButtonThemeConfig } from "./ButtonThemeConfig";
import { SidebarThemeConfig } from "./SidebarThemeConfig";
import { DrawerThemeConfig } from "./DrawerThemeConfig";
import { TableThemeConfig } from "./TableThemeConfig";

export const ManageTheme = createTheme({
  button: { ...ButtonThemeConfig },
  sidebar: { ...SidebarThemeConfig },
  drawer: { ...DrawerThemeConfig },
  table: { ...TableThemeConfig },
});
