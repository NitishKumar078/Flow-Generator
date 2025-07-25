// components/nodes/MessageNode.tsx
import { Handle, Position, type Node } from "@xyflow/react";
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
import { useLocation, useNavigate } from "react-router-dom";

interface NodeProps {
  data: {
    id: string;
    title: string;
    message: string;
  };
}
const MessageNodestruct: React.FC<NodeProps> = ({ data }) => {
  const navigate = useNavigate();
  const handleEditMessage = () => {
    // Logic to handle message editing can be added here
    console.log("Edit message clicked");
    navigate(`/editmessageNode/${data.id}`);
  };
  return (
    <div
      className="rounded-lg shadow-md border border-gray-300 w-[240px] "
      id={data.id || "null"}
    >
      <div className="bg-teal-200 text-gray-800 font-semibold px-3 py-2 rounded-t-lg flex items-center justify-between">
        <span typeof="title">📨 {data.title || "Send Message"}</span>
        <span>🟢</span>
      </div>
      <div
        typeof="message"
        className="bg-white px-3 py-2 text-sm text-gray-700"
        onClick={handleEditMessage}
        id={`message_${data.id}` || "null"}
      >
        {data.message || "No message"}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-gray-500 rounded-full -left-1"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-gray-500 rounded-full -right-1"
      />
    </div>
  );
};

const messageNode = (position: { x: number; y: number }, type: string) => {
  // Generate a unique ID for the node
  const generatedId = crypto.randomUUID();
  const newNode: Node = {
    id: generatedId,
    type,
    position,
    data: {
      id: generatedId,
      title: "Send Message",
      message: "Default message",
    },
    draggable: true,
  };
  return newNode;
};

function EditmessageNode(props: React.ComponentProps<typeof Sidebar>) {
  const navigator = useNavigate();
  const location = useLocation();
  const [message, setMessage] = React.useState("");
  return (
    <Sidebar collapsible="offcanvas" {...props} variant="floating">
      <Button
        className="w-20 m-1 p-1 cursor-pointer"
        onClick={() => navigator("/nodes")}
      >
        Back
      </Button>

      <SidebarHeader>
        <SidebarMenu className="text-center">
          <SidebarMenuItem>
            <span className="text-base font-semibold">Edit Message panal</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <label htmlFor="edit">Message</label>
              <input
                id="edit"
                type="text"
                className="font-bold w-[-webkit-fill-available] border-2 border-blue-400 inline-flex gap-1 m-1 p-2 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-grab group"
                placeholder="Enter the Message ..."
                onChange={(e) => setMessage(e.target.value)}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-center bg-blue-50 rounded-lg cursor-pointer">
          <Button
            className="w-20 m-1 p-1 bg-blue-700 hover:bg-blue-500  transition-all duration-300 "
            onClick={() => {
              // get the message from the input field
              console.log(location.pathname);
              const id = location.pathname.split("/").pop();
              const messageInput = document.getElementById(
                `message_${id}`
              ) as HTMLInputElement;
              messageInput.innerText = message || "No message";
              navigator("/nodes");
            }}
          >
            save
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export { MessageNodestruct, messageNode, EditmessageNode };
