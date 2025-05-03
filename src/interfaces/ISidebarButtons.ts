export interface ISidebarButtons {
  title: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  name: string;
  href: string;
}
export interface ISidebarButtonGroup {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children?: ISidebarButtonGroup[];
  name: string;
  title: string;
  href?: string;
  groupName?: string;
}
