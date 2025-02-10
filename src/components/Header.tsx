import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import "../styles/global.css";

const Header = () => {
  return (
    <AppBar sx={{ bgcolor: "#ffffff" }}>
      <Toolbar className="header">
        <Typography variant="h6" fontWeight="bold" color="#000">
          Where in the world?
        </Typography>
        <Box ml="auto" display="flex" alignItems="center">
          <IconButton sx={{ color: "#000" }}>
            <DarkModeOutlinedIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="#000">
            Dark Mode
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
