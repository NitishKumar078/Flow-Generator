import React, { createContext, useContext } from "react";
import type { Node, NodeChange, ReactFlowInstance } from "@xyflow/react";

// interface FlowContextType {
//   setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
//   reactFlowInstance: ReactFlowInstance | null;
//   setReactFlowInstance: (instance: ReactFlowInstance) => void;
// }

interface FlowContextType {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: (changes: NodeChange[]) => void;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (instance: ReactFlowInstance) => void;
}

export const FlowContext = createContext<FlowContextType | null>(null);

export const useFlowContext = () => {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("FlowContext is not provided");
  return ctx;
};
