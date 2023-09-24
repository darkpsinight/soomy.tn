import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackList } from "../../../redux/packSlice";

const PackModalBuy = (props) => {
  // get list of packs from server then use .map() and use a single pack model (below) not 6 packs
  const dispatch = useDispatch();
  const packs = useSelector((state) => state.pack.Packs);

  useEffect(() => {
    dispatch(fetchPackList());
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          backgroundColor: "#F2BCCA",
        }}
      >
        {packs ? (
          [...packs.Packs]
            .sort((a, b) => a.credit - b.credit)
            .map((pack) => (
              <Card key={pack._id} sx={{ maxWidth: 130, marginBottom: "10px" }}>
                <CardMedia
                  component="img"
                  alt={pack.credit + " Bitso"}
                  height="140"
                  image={pack.image.imageURL}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="pack-description"
                  >
                    Valable pour {pack.num_uses} enchéres
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="pack-price"
                  >
                    <p className="pack-price-text">
                      <span>{pack.prix}</span> Dinars
                    </p>
                  </Typography>
                  <Button
                    variant="contained"
                    className="button-recharge-pack"
                    onClick={() => {
                      props.handleRechargeClick();
                      props.setSelectedPack(pack._id);
                    }}
                  >
                    Recharger
                  </Button>
                </CardContent>
              </Card>
            ))
        ) : (
          <Box sx={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress color="secondary"/>
              <p mt-50>Chargement liste des packs</p>
            </div>
          </Box>
        )}
      </div>
    </>
  );
};

export default PackModalBuy;
