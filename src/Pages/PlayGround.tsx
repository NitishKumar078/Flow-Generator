import { useFlowContext } from "@/lib/FlowContext";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  addEdge,
  type Node,
  type Connection,
} from "@xyflow/react";
import { useCallback, useEffect, useRef } from "react";
import { nodeTypes } from "@/components/beta/nodes";
import "@xyflow/react/dist/style.css";
import { messageNode } from "@/components/alpha/MessageNode";

const PlayGroundCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setReactFlowInstance, reactFlowInstance } = useFlowContext();

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return;

      const position = {
        x: event.clientX,
        y: event.clientY,
      };
      // const newNode: Node = {
      //   id: crypto.randomUUID(),
      //   type,
      //   position,
      //   data: {
      //     title: "Send Message",
      //     message: "test message 1",
      //   },
      //   draggable: true,
      // };
      let newNode: any;
      if (type === "messageNode") {
        newNode = messageNode(position, type);
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="flex w-screen h-screen" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        isValidConnection={(connection) => {
          const hasEdgeAlready = edges.some((edge) => {
            if (edge.source) {
              edge.source === connection.source &&
                edge.sourceHandle === connection.sourceHandle;
            }
          });
          return !hasEdgeAlready;
        }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default PlayGroundCanvas;
