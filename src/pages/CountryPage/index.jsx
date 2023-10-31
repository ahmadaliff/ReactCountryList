import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../domain/Api";
import {
  Box,
  Button,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import style from "../../styles/style.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import { FavoriteBorderOutlined } from "@mui/icons-material";
const CountryPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(localStorage.getItem("mode"));
  const { name } = useParams();
  const [country, setCountry] = useState(false);
  useLayoutEffect(() => {
    getCountry();
  }, []);
  const getCountry = async () => {
    const response = await callAPI({ endpoint: `/name/${name}?fullText=true` });
    setCountry(response[0]);
  };
  const handleFavorite = () => {
    let arrFavCountry = localStorage.getItem("favorite");
    if (arrFavCountry) {
      let tempArr = JSON.parse(arrFavCountry);
      const filter = tempArr.filter(
        (val) => val.name.common == country.name.common
      );
      if (filter.length === 0) {
        tempArr.push(country);
        localStorage.setItem(
          "favorite",
          JSON.stringify(Array.from(new Set(tempArr)))
        );
      }
    } else {
      localStorage.setItem("favorite", JSON.stringify([country]));
    }
  };
  return (
    <Box className={style.CountryPage}>
      <Box className={style.buttonContainer}>
        <Button
          variant="contained"
          startIcon={<KeyboardBackspace />}
          className={style.backButton}
          size="small"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          startIcon={<FavoriteBorderOutlined />}
          className={style.backButton}
          size="small"
          onClick={() => handleFavorite()}
        >
          Add to Favorite
        </Button>
      </Box>
      <Box className={style.CountryDetailContainer}>
        <Box className={style.image}>
          <CardMedia
            component="img"
            height="300"
            sx={{ objectFit: "contain" }}
            image={country?.flags?.png}
            alt={country?.flags?.alt}
          />
        </Box>
        <Box className={style.CountryDetail}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontSize={"18px"}
            fontWeight={900}
          >
            {country?.name?.official}
          </Typography>
          <Box className={style.textDetailContainer}>
            <List>
              <ListItem disablePadding>
                Native Name:
                {country &&
                  Object.values(country?.name?.nativeName).map(
                    (val) => val.official
                  )[0]}
              </ListItem>
              <ListItem disablePadding>
                Population: {country?.population?.toLocaleString()}
              </ListItem>
              <ListItem disablePadding>
                Sub Region: {country?.subregion}
              </ListItem>
              <ListItem disablePadding>Region: {country?.region}</ListItem>
              <ListItem disablePadding>
                Capital:
                {country?.capital?.map((val, key) => (
                  <p key={key}> {val}</p>
                ))}
              </ListItem>
            </List>
            <List>
              <ListItem disablePadding>
                Top Level Domain: {country?.tld?.map((val) => val + " ")}
              </ListItem>
              <ListItem disablePadding>
                Currencies:
                {country &&
                  Object.values(country.currencies)
                    .map((val) => val.name + " ")
                    .join(", ")}
              </ListItem>
              <ListItem disablePadding>
                Languages:
                {country &&
                  Object.values(country.languages)
                    .map((val) => val)
                    .join(", ")}
              </ListItem>
            </List>
          </Box>
          <Box className={style.borderCountry}>
            <Typography variant="p">Border Country:</Typography>
            {country?.borders?.map((val, key) => (
              <Button
                variant="text"
                className={style.labelBorderCountry}
                key={key}
              >
                {val}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CountryPage;
