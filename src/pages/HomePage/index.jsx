import { useEffect, useState } from "react";
import callAPI from "../../domain/Api";
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
const HomePage = ({ style }) => {
  const [data, setData] = useState();
  const [countyData, setCountryData] = useState();
  const [regions, setRegions] = useState();
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCountryData();
  }, []);
  const getCountryData = async () => {
    setLoading(true);
    try {
      const response = await callAPI({ endpoint: "/all" });
      setCountryData(response);
      setData(response);
      setRegions(Array.from(new Set(response.map((val) => val.region))));
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          Loading...
        </Box>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

export default HomePage;
