import Layout from "./components/gama/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayGround from "./Pages/PlayGround";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Welcome to Flow Generator</h1>} />
          <Route path="/playground" element={<PlayGround />} />

          {/* <Route path="/invoice/viewInvoice" element={<InvoiceGenerator />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
