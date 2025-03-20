import { Box } from "@mui/material";

const BorderCountry = ({ country }: { country: string }) => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        color: "#000",
        textTransform: "none",
        px: 4,
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
        borderRadius: 1,
      }}
    >
      {country}
    </Box>
  );
};

export default BorderCountry;
