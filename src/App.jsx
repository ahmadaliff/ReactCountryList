import { BrowserRouter, Route, Routes } from "react-router-dom";
import Style from "./styles/style.module.scss";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import { Box } from "@mui/material";
import FavoritePage from "./pages/FavoritePage";
import { useEffect, useState } from "react";
function App() {
  const mode = useState(localStorage.getItem("mode"));
  const [isChange, setIsChange] = useState(true);
  const changeVal = () => {
    setIsChange(!isChange);
  };
  useEffect(() => {
    if (!mode) {
      localStorage.setItem("mode", "light");
    }
  }, [isChange]);
  return (
    <Box
      className={`${Style.bodyWrap}  ${
        localStorage.getItem("mode") === "dark" ? Style.dark : ""
      }`}
    >
      <BrowserRouter>
        <Navbar style={Style} changeVal={changeVal} />
        <Box className={Style.main}>
          <Routes>
            <Route path="/" element={<HomePage style={Style} />} />
            <Route path="/favorite" element={<FavoritePage style={Style} />} />
            <Route
              path="/country/:name"
              element={<CountryPage style={Style} />}
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
