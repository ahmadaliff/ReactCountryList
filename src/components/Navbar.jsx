import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = ({ style, changeVal }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(localStorage.getItem("mode"));
  return (
    <nav className={style.navContainer}>
      <h4 onClick={() => navigate("")}>Where in the world?</h4>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Button
          variant="text"
          size="small"
          disableElevation={true}
          color="inherit"
          className={style.button}
          onClick={() => navigate("favorite")}
        >
          Favorite Country
        </Button>
        <Button
          variant="text"
          size="small"
          disableElevation={true}
          color="inherit"
          className={style.button}
          startIcon={
            mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />
          }
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
            localStorage.setItem("mode", mode === "light" ? "dark" : "light");
            changeVal();
          }}
        >
          {mode === "dark" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Box>
    </nav>
  );
};

export default Navbar;
