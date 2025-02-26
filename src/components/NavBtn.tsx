import { Button, SvgIconProps } from "@mui/material";

import { ElementType } from "react";
import { Link } from "react-router-dom";

interface navBtnProps {
  label: string;
  link: string;
  icon?: ElementType<SvgIconProps>;
}

const NavBtn = ({ label, link, icon: Icon }: navBtnProps) => {
  return (
    <Button
      component={Link}
      to={link}
      variant="contained"
      sx={{
        bgcolor: "#fff",
        color: "#000",
        textTransform: "none",
        px: 4,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        "&:hover": {
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)", // Slightly stronger on hover
        },
      }}
    >
      {Icon && <Icon fontSize="small" sx={{ mr: 1 }} />}

      {label}
    </Button>
  );
};

export default NavBtn;
