import "../src/styles/global.css";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box minHeight="100vh">
        <Header />
      </Box>
    </ThemeProvider>
  );
}

export default App;
