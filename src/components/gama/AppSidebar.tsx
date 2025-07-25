"use client";

import * as React from "react";
import { House, Box, SquareTerminal, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/beta/sidebar";
import { Link } from "react-router-dom";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} variant="floating">
      {/*  Header with user info */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Box scale={2} size={5} />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <Link to={"/"} className="inline-flex items-center gap-1">
                <House className="size-5" />
                <SidebarMenuButton isActive>Play Ground</SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link to={"/nodes"} className="inline-flex items-center gap-1">
                <SquareTerminal scale={2} width={24} height={24} />
                <SidebarMenuButton>Nodes</SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem className="inline-flex items-center gap-1">
              <Settings scale={2} width={24} height={24} />
              <SidebarMenuButton>Settings</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {/* Add more SidebarGroups as needed */}
      </SidebarContent>

      {/* // Footer
      <SidebarFooter>hello world</SidebarFooter> */}
    </Sidebar>
  );
}
