import "./App.css";

import Home from "./Home";

import { createTheme, ThemeProvider } from "@material-ui/core";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Generator } from "./routes/Generator";
import { Generate } from "./routes/Generate";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1CE2E6",
    },
    secondary: {
      main: "#e709e7",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: "Orbitron",
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: "flex-start",
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: "12px 16px",
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const App = () => {
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
