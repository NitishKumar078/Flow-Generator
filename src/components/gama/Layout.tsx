import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "../beta/sidebar";
import { AppSidebar } from "./AppSidebar";
import Nodepanal from "./Nodepanal";
import { useLocation } from "react-router-dom";
import { EditmessageNode } from "../alpha/MessageNode";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // console.log("checking the nodes", nodes);
  const [sidepanal, setSidebar] = useState("null");
  const location = useLocation();
  useEffect(() => {
    // Ensure the document is ready before applying styles
    if (location.pathname == "/nodes") {
      setSidebar("nodes");
    } else if (location.pathname.includes("/editmessageNode/")) {
      setSidebar("edit_message");
    }
    // else if (location.pathname == "/settings") {
    //   setSidebar("settings");
    // }
    else {
      setSidebar("null");
    }
  }, [sidepanal, location.pathname]);

  const SidePanelRenderer = ({ sidepanal }: { sidepanal: string }) => {
    switch (sidepanal) {
      case "nodes":
        return <Nodepanal />;
      case "edit_message":
        return <EditmessageNode />;
      // case "settings":
      //   return <Setting />;
      default:
        return <AppSidebar />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen flex-col">
        {/* Sidebar always visible */}

        <SidePanelRenderer sidepanal={sidepanal} />
        {/* Main content area */}
        <main className="flex flex-row ">
          <SidebarTrigger className="fixed top-2 left-64 z-100 cursor-pointer" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
