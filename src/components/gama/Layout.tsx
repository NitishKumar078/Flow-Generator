import { SidebarProvider, SidebarTrigger } from "../beta/sidebar";
import { AppSidebar } from "../beta/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen flex-col">
        {/* Sidebar always visible */}
        <AppSidebar />
        {/* Main content area */}
        <main className="flex flex-row ">
          <SidebarTrigger className="fixed top-2 left-64 z-100 cursor-pointer" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
