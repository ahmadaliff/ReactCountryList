import { useEffect, useState } from "react";
import CountryCard from "../../components/CountryCard";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
const FavoritePage = ({ style }) => {
  const [data, setData] = useState();
  const [countyData, setCountryData] = useState();
  const [regions, setRegions] = useState();
  const [region, setRegion] = useState("");
  useEffect(() => {
    getCountryData();
  }, []);
  const getCountryData = () => {
    const response = JSON.parse(localStorage.getItem("favorite"));
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

  const handleDeleteFromFav = (index) => {
    let arrFavCountry = localStorage.getItem("favorite");
    if (arrFavCountry) {
      let tempArr = JSON.parse(arrFavCountry);
      const filteredArr = tempArr.filter(
        (val) => val.name.common != tempArr[index].name.common
      );
      localStorage.setItem("favorite", JSON.stringify(filteredArr));
    }
  };
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
          sx={{ height: "2.5rem" }}
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
        {data ? (
          data.map((val, key) => (
            <Grid key={key} item sx={{ position: "relative" }}>
              <CountryCard
                name={val.name.common}
                population={val.population}
                capital={val.capital}
                region={val.region}
                image={val.flags}
                style={style}
              />
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                className={style.delFavButton}
                size="small"
                onClick={() => handleDeleteFromFav(key)}
              >
                Delete From Favorit
              </Button>
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "50vh",
            }}
          >
            No Favorit Country
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default FavoritePage;
