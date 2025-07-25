import { useFlowContext } from "@/lib/FlowContext";
import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type ReactFlowInstance,
} from "@xyflow/react";
import { useCallback, useRef, useState } from "react";
import { nodeTypes } from "@/components/beta/nodes";
import "@xyflow/react/dist/style.css";
import { messageNode } from "@/components/alpha/MessageNode";
import { Button } from "@/components/alpha/button";
import DialogBox from "@/components/beta/diglogBox";

const PlayGroundCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [DialogMessage, setDialogMessage] = useState("");
  const [DialogTitle, setDialogTitle] = useState("");
  const [isdialogopen, setisdialogopen] = useState(false);
  const {
    nodes,
    setNodes,
    onNodesChange,
    reactFlowInstance,
    setReactFlowInstance,
  } = useFlowContext();

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return;

      const position = {
        x: event.clientX,
        y: event.clientY,
      };

      let newNode: Node;
      if (type === "messageNode") {
        newNode = messageNode(position, type);
      } else {
        // Fallback for other node types
        newNode = {
          id: crypto.randomUUID(),
          type,
          position,
          data: {},
        };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  function getNodesWithNoIncomingEdges(nodes: Node[], edges: Edge[]): Node[] {
    const targetIds = new Set(edges.map((edge) => edge.target));
    return nodes.filter((node) => !targetIds.has(node.id));
  }

  const handleNodevalidation = (nodes: Node[], edges: Edge[]) => {
    const orphanNodes = getNodesWithNoIncomingEdges(nodes, edges);

    if (orphanNodes.length) {
      // console.log("Nodes with no incoming edges:", orphanNodes);
      // alert("can't save the flow, some nodes have no incoming edges.");
      setDialogMessage(
        "can't save the flow, some nodes have no incoming edges."
      );
      setisdialogopen(true);
      setDialogTitle("Error");
    } else {
      // console.log("All nodes have incoming edges.");
      setDialogMessage("Saved");
      setisdialogopen(true);
      setDialogTitle("success");
    }
    console.log(getNodesWithNoIncomingEdges(nodes, edges));
  };

  const onInit = useCallback(
    (instance: ReactFlowInstance<Node, Edge>) => {
      setReactFlowInstance(instance);
    },
    [setReactFlowInstance]
  );

  return (
    <>
      <DialogBox
        message={DialogMessage}
        title={DialogTitle}
        tigger={isdialogopen}
        closeer={setisdialogopen}
      />
      <Button
        className="bg-blue-500 fixed top-1 left-1/2 hover:bg-blue-800 transform-fill duration-100 font-bold z-100 cursor-pointer"
        onClick={() => {
          handleNodevalidation(nodes, edges);
        }}
      >
        save
      </Button>

      <div className="flex w-screen h-screen" ref={reactFlowWrapper}>
        <ReactFlow<Node, Edge>
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={onInit}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          isValidConnection={(connection) => {
            const hasEdgeAlready = edges.some((edge) => {
              return (
                edge.source === connection.source &&
                edge.sourceHandle === connection.sourceHandle
              );
            });
            return !hasEdgeAlready;
          }}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
};

export default PlayGroundCanvas;
