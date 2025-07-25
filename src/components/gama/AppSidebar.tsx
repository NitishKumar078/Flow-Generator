"use client";

import * as React from "react";
import { House, Box, SquareTerminal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/beta/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../alpha/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
              <Link to={"/"} className="inline-flex items-center gap-1 ">
                <House className="size-5" />
                <SidebarMenuButton isActive className="cursor-pointer">
                  Play Ground
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link
                to={"/nodes"}
                className="inline-flex items-center gap-1 cursor-pointer"
              >
                <SquareTerminal scale={2} width={24} height={24} />
                <SidebarMenuButton className="cursor-pointer">
                  Nodes
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            {/* <SidebarMenuItem className="inline-flex items-center gap-1">
              <Link to={"/settings"} className="inline-flex items-center gap-1">
                <Settings scale={2} width={24} height={24} />
                <SidebarMenuButton>Settings</SidebarMenuButton>
              </Link>
            </SidebarMenuItem> */}
          </SidebarMenu>
        </SidebarGroup>
        {/* Add more SidebarGroups as needed */}
      </SidebarContent>

      {/* <SidebarFooter>
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Instructions:</h4>
          <p className="text-sm text-blue-700">
            go to the settings panal to save the Flow....
          </p>
        </div>
      </SidebarFooter> */}
    </Sidebar>
  );
}

export const Setting = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const navigate = useNavigate();
  return (
    <Sidebar collapsible="offcanvas" {...props} variant="floating">
      <Button
        className="w-20 m-1 p-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Back
      </Button>

      <SidebarHeader>
        <SidebarMenu className="text-center">
          <SidebarMenuItem>
            <span className="text-base font-semibold">Settings</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <Link to={"/"} className="inline-flex items-center gap-1">
                <label className="font-bold">save the Flow </label>
                <Button className="bg-blue-500 hover:bg-blue-800 transform-fill duration-100">
                  click me
                </Button>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {/* Add more SidebarGroups as needed */}
      </SidebarContent>
    </Sidebar>
  );
};
