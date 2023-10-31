import { useEffect, useState } from "react";
import CountryCard from "../../components/CountryCard";
import {
  Box,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const FavoritePage = ({ style }) => {
  const [mode, setMode] = useState(localStorage.getItem("mode"));
  const [data, setData] = useState();
  const [countyData, setCountryData] = useState();
  const [regions, setRegions] = useState();
  const [region, setRegion] = useState("");
  useEffect(() => {
    getCountryData();
  }, []);
  const getCountryData = () => {
    const response = JSON.parse(localStorage.getItem("favorite"));
    console.log(response);
    response && setCountryData(response);
    response && setData(response);
    response &&
      setRegions(Array.from(new Set(response.map((val) => val.region))));
  };
  const handleSearch = (e) => {
    setData(
      Object.values(countyData).filter((val) =>
        val.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const handleFilterByRegion = (e) => {
    setRegion(e.target.value);
  };
  useEffect(() => {
    countyData &&
      setData(
        Object.values(countyData).filter((val) =>
          val.region.toLowerCase().includes(region.toLowerCase())
        )
      );
  }, [region]);

  return (
    <Box className={style.homePageWrap}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem",
        }}
        className={style.boxAtas}
      >
        <TextField
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <Select
          id="demo-simple-select"
          size="small"
          sx={{ height: "2.2rem" }}
          value={region}
          onChange={handleFilterByRegion}
          displayEmpty
        >
          <MenuItem value="" sx={{ display: "none" }}>
            Filter By Region
          </MenuItem>
          {regions?.map((val, key) => (
            <MenuItem value={val} key={key}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={6} justifyContent={"center"}>
        {data?.map((val, key) => (
          <Grid key={key} item>
            <CountryCard
              name={val.name.common}
              population={val.population}
              capital={val.capital}
              region={val.region}
              image={val.flags}
              style={style}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoritePage;
