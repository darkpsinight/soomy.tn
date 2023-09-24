import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  CircularProgress,
  Box,
  Stack,
  Alert,
  AlertTitle,
  Switch,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Tooltip } from "@mui/material";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseDashboard } from "../../../redux/packPurchaseSlice";
import {
  createPackUse,
  fetchPackUseByRoomAndUser,
  updatePackUseValidity,
  setsold,
} from "../../../redux/packUseSlice";
import CIcon from "@coreui/icons-react";
import { cilCheckCircle, cilClock } from "@coreui/icons";
import { Badge } from "antd";
import { setCloseModalCredit } from "../../../redux/userSlice";
import { updatePurchase } from "../../../redux/packPurchaseSlice";
import "./styles.css";

const PackModalSelection = (props) => {
  const dispatch = useDispatch();

  // get user id from redux (to perform axios api call and get purchased pack for this user by its id), check "packPurchaseSlice.js"
  const user = useSelector((state) => state.user);
  const userId = user?.userInfo?._id;

  // get purchased packs from redux
  const purchasedPacks = useSelector((state) => state.purchase?.purchasedPacks);
  const purchasedPacksData = purchasedPacks?.packPurchases || [];

  // dispatch getPurchase api by specific user id to get all purchased packs for that user
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPurchaseDashboard({ id: userId }));
    };

    if (userId) {
      fetchData();
    }
  }, [dispatch, userId]);

  // sort packs before map by credit
  const sortedPacks = [...purchasedPacksData].sort(
    (a, b) => a.credit - b.credit
  );

  // get packUse from redux (to control the disable status of pack's button)
  const packUse = useSelector((state) => state.packUse.packUse);

  // get packUse status (error/message payload) from redux
  const updateErrors = useSelector((state) => state.packUse.error);
  const updatedPackMessage = useSelector(
    (state) => state.packUse.packUse?.message
  );

  // get purchased packs error if not found from redux
  const isError = useSelector((state) => state.purchase.updateErrors);

  // get roomId from redux, needed for API "createPackUse"
  const roomId = useSelector((state) => state?.room?.idParam);

  // handle "acheter un packs" <div>, onclick return to list of packs tab
  const handleBuyClick = () => {
    props.setCurrentStep("buy");
    props.setValue(0);
  };

  // handle loading state with MUI spinner
  const updateLoading = useSelector((state) => state.packUse.isLoading);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };

  // CSS styles for custom positioning of Ribbon
  const ribbonStyles = {
    position: "absolute",
    top: "-10px",
    right: "-8px",
    left: "5px",
    zIndex: "1",
  };

  // handle button "Choisir"
  const handleClick = (selectedPurchasedPack_Id) => {
    dispatch(
      createPackUse({
        room_id: roomId,
        user_id: userId,
        selectedPurchasedPack_Id,
      })
    )
      .then((response) => {
        // After createPackUse is completed, show the snackbar
        handleSnackbarOpen();

        // After the snackbar is displayed, dispatch setCloseModalCredit
        setTimeout(() => {
          // add if condition (when status 200 of create packUse)
          if (response.type === "packUse/createPackUse/fulfilled") {
            dispatch(setCloseModalCredit());
          }
        }, 2000);
      })
      .catch((error) => {
        // Handle any errors that occur during createPackUse, handleSnackbarOpen, or setCloseModalCredit
        console.error("An error occurred:", error);
      });
  };

  // block button view when user out of auction
  const [blocked, setBlocked] = useState(false);

  // get auction status to determine if button "utiliser" can be seen or not
  const auction = useSelector((state) => state.room?.auction);

  // get participation to check if user participated to selected auction and then determinal button "utiliser" visibility
  const participation = useSelector((state) => state.participation);
  const room = useSelector((state) => state.room);

  useEffect(() => {
    // Check if participation is an array and not empty
    if (
      participation?.userParticipationList &&
      participation?.userParticipationList?.length > 0
    ) {
      const foundParticipation = participation?.userParticipationList?.find(
        (part) => part.room && part.room._id === room?.idParam
      );
      if (!foundParticipation) {
        setBlocked(true);
      }
    }
  }, [participation]);

  useEffect(() => {
    if (!auction && purchasedPacks) {
      setBlocked(true);
    }
  }, [auction, purchasedPacks]);

  // ...
  const isLoading = useSelector((state) => state.purchase.updateLoading);

  // check and change purchased pack behaviour (and their button too)
  const [isHiddenButton, setIsHiddenButton] = useState(true); // button of packPurchase
  const [isHiddenPack, setIsHiddenPack] = useState(true); // the whole packPurchase
  const [selectedButton, setSelectedButton] = useState(true);

  const remaining = useSelector((state) => state.packUse?.packUse?.remaining);

  useEffect(() => {
    if (auction?.status === "enable" && packUse) {
      /* dispatch(
        updatePackUseValidity({
          packUseId: packUse?._id,
          payload: {
            user_id: userId,
            room_id: roomId,
            selectedPurchasedPack_Id: packUse?.selectedPurchasedPack_Id,
          },
        })
      ).then(() => { */
      purchasedPacksData.forEach((item) => {
        dispatch(
          updatePurchase({ info: item._id, payload: { user_id: userId } })
        );
      });
      /* }); */
    }
  }, []);

  /*   const temp_remaining = useSelector((state) => state.packUse.remaining)

  useEffect(() => {
    if (temp_remaining && temp_remaining < auction?.mise) {
    dispatch(
      updatePackUseValidity({
        packUseId: packUse?._id,
        payload: {
          user_id: userId,
          room_id: roomId,
          selectedPurchasedPack_Id: packUse?.selectedPurchasedPack_Id,
        },
      })
    );
  }
  }, []); */

  // collecting all used packUse in one array (packUse that has isEnabled = false) (to simplify control of button rendring)
  useEffect(() => {
    dispatch(fetchPackUseByRoomAndUser({ roomId: roomId, userId: userId }));
  }, []);
  const allPackUses = useSelector((state) => state.packUse.allPackUse);

  // get only old packUse (excluding the current packUse)
  const disabledPackUses =
    allPackUses && allPackUses.filter((pack) => pack.isEnabled === false);

  // switch
  const initialShowAvailablePacks =
    localStorage.getItem("showAvailablePacks") === "true" || false;

  const [showAvailablePacks, setShowAvailablePacks] = useState(
    initialShowAvailablePacks
  );

  useEffect(() => {
    localStorage.setItem("showAvailablePacks", showAvailablePacks);
  }, [showAvailablePacks]);

  const filteredPacks = showAvailablePacks
    ? sortedPacks.filter((pack) => pack.availability === true)
    : sortedPacks;

  const switchLabel = "Afficher les packs disponibles";

  return (
    <div>
      <h1>Vos Packs:</h1>
      <div
        style={{
          backgroundColor: "#f9124e",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "30px",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: "white", marginLeft: "8px" }}>{switchLabel}</span>
        <Switch
          checked={showAvailablePacks}
          onChange={() => setShowAvailablePacks(!showAvailablePacks)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          backgroundColor: "#F2BCCA",
        }}
      >
        {filteredPacks.length > 0 ? (
          filteredPacks.map((pack) =>
            pack ? (
              <Badge.Ribbon
                key={pack?._id}
                text={
                  <div style={{ fontSize: "0.9em" }}>
                    <span style={{ fontWeight: "bolder", fontSize: "15px" }}>
                      {pack.num_uses}
                    </span>{" "}
                    enchéres restantes
                  </div>
                }
                color={pack.num_uses === 0 ? "red" : "green"}
                style={ribbonStyles}
              >
                <Card
                  key={pack?._id}
                  sx={{ maxWidth: 130, marginBottom: "10px" }}
                >
                  <CardMedia
                    component="img"
                    alt="10 Bitso"
                    height="140"
                    image={pack?.pack_id?.image?.imageURL}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="pack-description"
                    >
                      Valable pour {pack?.pack_id?.num_uses} enchéres
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="pack-price"
                    >
                      <p className="pack-price-text">
                        <span>{pack?.pack_id?.prix}</span> Dinars
                      </p>
                    </Typography>
                    {!blocked && (
                      <>
                        {packUse !== null &&
                        packUse?.selectedPurchasedPack_Id === pack?._id &&
                        packUse?.isEnabled === true ? (
                          <Tooltip
                            title="Pack sélectionné"
                            arrow
                            placement="bottom"
                          >
                            <span>
                              <Button
                                variant="contained"
                                className="button-utiliser-pack-disabled"
                                disabled
                              >
                                <CIcon
                                  icon={cilCheckCircle}
                                  size="lg"
                                  style={{ color: "#ffffff" }}
                                />
                              </Button>
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            {allPackUses && allPackUses.length > 0 && (
                              <>
                                {allPackUses.some(
                                  (packUseItem) =>
                                    packUseItem?.selectedPurchasedPack_Id ===
                                      pack._id &&
                                    packUseItem.isEnabled === false
                                ) ? (
                                  <Tooltip
                                    title="Pack déjà utilisé"
                                    arrow
                                    placement="bottom"
                                  >
                                    <span>
                                      <Button
                                        variant="contained"
                                        className="button-utiliser-pack-disabled-not-enabled"
                                        disabled
                                      >
                                        <CIcon
                                          icon={cilClock}
                                          size="lg"
                                          style={{ color: "#ffffff" }}
                                        />
                                      </Button>
                                    </span>
                                  </Tooltip>
                                ) : (
                                  <span>
                                    <Button
                                      variant="contained"
                                      className="button-utiliser-pack"
                                      onClick={() => handleClick(pack?._id)}
                                    >
                                      Choisir
                                    </Button>
                                  </span>
                                )}
                              </>
                            )}
                          </>
                        )}

                        {packUse?.isEnabled === false &&
                          allPackUses === null && (
                            <span>
                              <Button
                                variant="contained"
                                className="button-utiliser-pack"
                                onClick={() => handleClick(pack?._id)}
                              >
                                Choisir
                              </Button>
                            </span>
                          )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </Badge.Ribbon>
            ) : (
              <Badge.Ribbon
                key={pack?._id}
                text={
                  <div style={{ fontSize: "0.9em" }}>
                    <span style={{ fontWeight: "bolder", fontSize: "15px" }}>
                      {pack.num_uses}
                    </span>{" "}
                    enchéres restantes
                  </div>
                }
                color={pack.num_uses === 0 ? "red" : "green"}
                style={ribbonStyles}
              >
                <Card
                  key={pack?._id}
                  sx={{ maxWidth: 130, marginBottom: "10px" }}
                >
                  <CardMedia
                    component="img"
                    alt="10 Bitso"
                    height="140"
                    image={pack?.pack_id?.image?.imageURL}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="pack-description"
                    >
                      Valable pour {pack?.pack_id?.num_uses} enchéres
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="pack-price"
                    >
                      <p className="pack-price-text">
                        <span>{pack?.pack_id?.prix}</span> Dinars
                      </p>
                    </Typography>
                    {!blocked && (
                      <>
                        {packUse?.selectedPurchasedPack_Id === pack?._id && (
                          <Tooltip
                            title="Pack sélectionné"
                            arrow
                            placement="bottom"
                          >
                            <span>
                              <Button
                                variant="contained"
                                className="button-utiliser-pack-disabled"
                                disabled
                              >
                                <CIcon
                                  icon={cilCheckCircle}
                                  size="lg"
                                  style={{ color: "#ffffff" }}
                                />
                              </Button>
                            </span>
                          </Tooltip>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </Badge.Ribbon>
            )
          )
        ) : filteredPacks.length === 0 && isError ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning" sx={{ backgroundColor: "#f7e8a6" }}>
              <AlertTitle sx={{ fontWeight: "bold", display: "flex" }}>
                {isError}
              </AlertTitle>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ marginRight: "4px" }}>
                  Vous n'avez pas encore de packs dans votre collection
                </span>
                <div style={{ marginTop: "10px" }}>
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "black",
                      fontWeight: "800",
                      fontSize: "13px",
                      fontStyle: "italic",
                      textTransform: "uppercase",
                    }}
                    onClick={handleBuyClick}
                  >
                    Acheter des packs ?
                  </span>
                </div>
              </div>
            </Alert>
          </Stack>
        ) : isLoading ? (
          <Box sx={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress size={40} color="secondary" />
              <p mt-50>Chargement vos packs achetés</p>
            </div>
          </Box>
        ) : (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning" sx={{ backgroundColor: "#f7e8a6" }}>
              <AlertTitle sx={{ fontWeight: "bold", display: "flex" }}>
                {isError}
              </AlertTitle>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ marginRight: "4px" }}>
                  Vous n'avez aucun pack valable.
                </span>
                <div style={{ marginTop: "10px" }}>
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "black",
                      fontWeight: "800",
                      fontSize: "13px",
                      fontStyle: "italic",
                      textTransform: "uppercase",
                    }}
                    onClick={handleBuyClick}
                  >
                    Acheter des packs ?
                  </span>
                </div>
              </div>
            </Alert>
          </Stack>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          TransitionComponent={Slide}
          TransitionProps={{
            direction: "right",
          }}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={
              updateLoading ? "info" : updateErrors ? "error" : "success"
            }
            sx={{ width: "100%" }}
          >
            {updateLoading ? (
              <div style={{ display: "flex", overflow: "hidden" }}>
                <span style={{ marginRight: "8px" }}>
                  Sélectionnement du pack en cours...
                </span>
                <CircularProgress size={20} />
              </div>
            ) : (
              updateErrors || "Pack sélectionné avec succès"
            )}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default PackModalSelection;
