import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/gama/Layout";
import PlayGround from "./Pages/PlayGround";
import { FlowContext } from "./lib/FlowContext";
import { useState } from "react";
import { useNodesState, type ReactFlowInstance } from "@xyflow/react";

function App() {
  const [nodes, setNodes] = useNodesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  return (
    <Router>
      <FlowContext.Provider
        value={{ setNodes, reactFlowInstance, setReactFlowInstance }}
      >
        <Layout>
          <Routes>
            <Route path="/*" element={<PlayGround />} />
          </Routes>
        </Layout>
      </FlowContext.Provider>
    </Router>
  );
}

export default App;
