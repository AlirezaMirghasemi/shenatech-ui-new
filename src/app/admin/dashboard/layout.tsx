import { Header } from "@/components/admin/Header";
import { SidebarPanel } from "@/components/admin/SidebarPanel";

export default function AdminPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <SidebarPanel />
      {children}
    </>
  );
}
