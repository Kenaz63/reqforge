import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./pages/Workspace";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
    path="/workspace"
    element={<Workspace />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;