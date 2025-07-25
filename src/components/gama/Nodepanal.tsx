import React from "react";
import { MessageSquareText } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarContent,
  SidebarFooter,
} from "../beta/sidebar";
import { Button } from "../alpha/button";

export default function NodePanal(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} variant="floating">
      <Button className="w-20 m-1 p-1 cursor-pointer">Back</Button>

      <SidebarHeader>
        <SidebarMenu className="text-center">
          <SidebarMenuItem>
            <span className="text-base font-semibold">NodePanel</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            <SidebarMenuItem
              draggable
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData(
                  "application/reactflow",
                  "messageNode"
                );
              }}
              className="border-2 border-blue-400 inline-flex gap-1 m-1 p-2 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-grab group"
            >
              <MessageSquareText className="text-blue-400 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
              <span className="text-blue-400">Message</span>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Instructions:</h4>
          <p className="text-sm text-blue-700">
            Drag a node and drop it onto the canvas to create a new element.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
