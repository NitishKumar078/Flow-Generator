// components/nodes/MessageNode.tsx
import React from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

const MessageNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="rounded-lg shadow-md border border-gray-300 w-[240px]">
      <div className="bg-teal-200 text-gray-800 font-semibold px-3 py-2 rounded-t-lg flex items-center justify-between">
        <span>📨 {data.title || "Send Message"}</span>
        <span>🟢</span>
      </div>
      <div className="bg-white px-3 py-2 text-sm text-gray-700">
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

export default MessageNode;
