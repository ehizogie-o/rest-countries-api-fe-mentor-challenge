import "../src/styles/global.css";
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./styles/theme";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box minHeight="100vh">
          <Header />
          <Box mt="64px" py={4} px={5}>
            <Home />
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
