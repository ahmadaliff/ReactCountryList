import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ image, name, population, region, capital, style }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 250 }} className={style.card}>
      <CardActionArea onClick={() => navigate(`/country/${name}`)}>
        <CardMedia
          component="img"
          image={image.png}
          alt={image.alt}
          height={150}
        />
        <CardContent sx={{ height: 230 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontSize={"20px"}
            fontWeight={700}
          >
            {name}
          </Typography>
          <List>
            <ListItem disablePadding>
              Population : {population?.toLocaleString()}
            </ListItem>
            <ListItem disablePadding>Region : {region}</ListItem>
            <ListItem disablePadding>
              Capital :
              {capital?.map((val, key) => (
                <p key={key}> {val}</p>
              ))}
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
