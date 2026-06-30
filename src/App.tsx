import "./App.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Generator } from "./routes/Generator";
import { Generate } from "./routes/Generate";
import { Toaster } from "components/ui/sonner";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route
            path="/generate/:seedString/:backgroundType/:shapeType/:shapeBorder/:resolution"
            element={<Generate />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" duration={3000} />
    </>
  );
};

export default App;
