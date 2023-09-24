import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchPackList } from "../../../redux/packSlice";
import CarouselMulti from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomRightArrow from "../../../components/CustomRightArrow";
import CustomLeftArrow from "../../../components/CustomLeftArrow";
import { setShowModalCredit } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const interval = 1500;

const CarouselPackCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const packs = useSelector((state) => state.pack.Packs?.Packs);
  const loadingPacks = useSelector((state) => state.pack.loadingPackList);
  const user = useSelector((state) => state.user?.userInfo);

  useEffect(() => {
    dispatch(fetchPackList());
  }, [dispatch]);

  const handleCardClick = () => {
    dispatch(setShowModalCredit());
  };

  const sortedPacks = packs?.slice().sort((a, b) => a.credit - b.credit);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1500, min: 1100 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 1100, min: 550 },
      items: 2,
    },
    smallmobile: {
      breakpoint: { max: 550, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container carousel-root">
      <CarouselMulti
        swipeable={true}
        slidesToSlide={1}
        autoPlay={true}
        ssr={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        infinite={true}
        deviceType={"desktop"}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
      >
        {loadingPacks ? (
          <div className="centerVerticalStyle">
            <CircularProgress sx={{ color: "#F9124E" }} />
          </div>
        ) : sortedPacks && sortedPacks.length > 0 ? (
          sortedPacks?.map((pack) => (
            <div key={pack._id} className="centerVerticalStyle">
              <Stack
                direction="horizontal"
                className="h-100 justify-content-center align-items-center carousel-stack-container"
                gap={3}
              >
                <Card
                  key={pack._id}
                  sx={{ maxWidth: 130, marginBottom: "10px" }}
                  className="carousel-card"
                  onClick={handleCardClick}
                >
                  <CardMedia
                    component="img"
                    alt="img Bitso"
                    image={pack?.image?.imageURL}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="pack-description-carousel"
                    >
                      Valable pour {pack?.num_uses} enchères
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="pack-price"
                    >
                      <p className="pack-price-text-carousel">
                        <span>{pack?.prix}</span> Dinars
                      </p>
                    </Typography>
                    <Button
                      variant="contained"
                      className="button-recharge-pack"
                      style={{ width: "140px", height: "40px", borderRadius: "7px" }}
                      onClick={() => {
                        if (!user) {
                          navigate("/signin");
                        }
                      }}
                    >
                      Recharger
                    </Button>

                  </CardContent>
                </Card>
              </Stack>
            </div>
          ))
        ) : (
          <div className="centerVerticalStyle">
            <p>
              Aucun pack disponible actuellement, veuillez revenir plus tard
            </p>
          </div>
        )}
      </CarouselMulti>
    </div>
  );
};

export default CarouselPackCard;
