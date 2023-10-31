import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  subtitle: ReactNode;
  greeting: ReactNode;
  onReturnHome: () => void;
}

const Banner = ({ title, subtitle, greeting, onReturnHome }: Props) => {
  return (
    <Box
      sx={{
        bgcolor: "#CC0000",
        width: "100%",
        height: "150px",
        m: 0,
        color: "white",
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          width: "fit-content",
          position: "relative",
          top: "50%",
          transform: "transLateY(-50%)",
          ":hover": {
            cursor: "pointer",
          },
          ":active": {
            color: "lightgrey",
          },
        }}
        onClick={() => onReturnHome()}
      >
        <Box sx={{ fontSize: "48px", ml: "30px" }}>{title}</Box>

        <Box sx={{ margin: "auto", width: "fit-content", fontSize: "32px" }}>
          {subtitle}
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: "25px",
          top: "50px",
          fontSize: "25px",
        }}
      >
        {greeting}
      </Box>
    </Box>
  );
};

export default Banner;
