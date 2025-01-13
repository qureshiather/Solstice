import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Generator } from "./routes/Generator";
import { Generate } from "./routes/Generate";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#8aadf4", // Sky
        contrastText: "#24273a", // Base
      },
      secondary: {
        main: "#f5bde6", // Pink
        contrastText: "#24273a", // Base
      },
      background: {
        default: "#24273a", // Base
        paper: "#1e2030", // Mantle
      },
      text: {
        primary: "#cad3f5", // Text
        secondary: "#a5adcb", // Subtext1
      },
      error: {
        main: "#ed8796", // Red
      },
      warning: {
        main: "#f5a97f", // Peach
      },
      info: {
        main: "#8bd5ca", // Teal
      },
      success: {
        main: "#a6da95", // Green
      },
      divider: "#494d64", // Overlay1
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
