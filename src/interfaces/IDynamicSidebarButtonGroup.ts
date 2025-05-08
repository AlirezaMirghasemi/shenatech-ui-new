
export interface IDynamicSidebarButtonGroup {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children?: IDynamicSidebarButtonGroup[];
  name: string;
  title: string;
  href?: string;
  groupName?: string;
}
