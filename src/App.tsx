import "./styles/global.css";
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./styles/theme";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box minHeight="100vh">
            <Header />
            <Box mt="64px" py={4} px={5}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details" element={<Details />} />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
