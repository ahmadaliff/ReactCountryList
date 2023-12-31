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
import {
  KeyboardBackspace,
  FavoriteBorderOutlined,
  Favorite,
} from "@mui/icons-material";
const CountryPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [country, setCountry] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useLayoutEffect(() => {
    getCountry();
    const arrFavCountry = JSON.parse(localStorage.getItem("favorite"));
    arrFavCountry?.length > 0 &&
      setIsFav(
        arrFavCountry?.filter((val) => val.name.common == country?.name?.common)
          .length > 0
      );
  }, [refresh]);
  const getCountry = async () => {
    setLoading(true);
    try {
      const response = await callAPI({
        endpoint: `/name/${name}?fullText=true`,
      });
      setCountry(response[0]);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
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
    setRefresh(!refresh);
  };
  const handleDelFav = () => {
    let arrFavCountry = localStorage.getItem("favorite");
    if (arrFavCountry) {
      let tempArr = JSON.parse(arrFavCountry);
      const filteredArr = tempArr.filter(
        (val) => val.name.common != country.name.common
      );
      localStorage.setItem("favorite", JSON.stringify(filteredArr));
      setRefresh(!refresh);
    }
  };
  return (
    <Box className={style.CountryPage}>
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
              startIcon={isFav ? <Favorite /> : <FavoriteBorderOutlined />}
              className={
                isFav
                  ? `${style.backButton}  ${style.IsFav}`
                  : `${style.backButton}`
              }
              size="small"
              onClick={isFav ? () => handleDelFav() : () => handleFavorite()}
            >
              {isFav
                ? `${country?.name?.common} is favorite Country`
                : "Add to Favorite"}
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
        </>
      )}
    </Box>
  );
};

export default CountryPage;
