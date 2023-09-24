// this is the page after you select a pack and choose payment method
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  ButtonBase,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import Sobflous from "../../../assets/images/sobflous.png";
import clickToPayLogo from "../../../assets/images/click-to-pay 2.png";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createCredit, setResponsePayload } from "../../../redux/userSlice";
import { createPurchase } from "../../../redux/packPurchaseSlice";
import { GrFormClose } from "react-icons/gr";

const PackModalMethodPay = (props) => {
  const [firstUrl, setFirstUrl] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userName, setUserName] = useState("2812800148");
  const [password, setPassword] = useState("vBg8d3C2");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popupWindow, setPopupWindow] = useState(null);
  const [severity, setSeverity] = useState("success");
  const [showAlert, setShowAlert] = useState(true);

  // handle alert close
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // get (user) data from redux-toolkit
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const usernameClient = useSelector((state) => state.user.userInfo.username);

  // get (packs) data from redux-toolkit extract the prix, validite, credit and image
  const packs = useSelector((state) => state.pack.Packs);
  let prix, validite, credit, image;
  for (let index = 0; index < packs.Packs.length; index++) {
    const element = packs.Packs[index];
    let packId = props.selectedPack;
    if (packId === element._id) {
      prix = element.prix;
      validite = element.num_uses;
      credit = element.credit;
      image = element.image.imageURL;
    }
  }

  // function to generate pack id using uuidv4 library
  const generateOrderNumber = () => {
    const orderNumber = uuidv4().replace(/-/g, "");
    return orderNumber.substring(0, 32);
  };

  // handle payment click
  const handleCardClick = () => {
    // necessary data to be sent to clicToPay server to render payment form (check clicToPay docs)
    const userName = "2812800148";
    const password = "vBg8d3C2";
    const orderNumber = generateOrderNumber();
    const amount = prix * 1000;
    const currency = 788; // Dinar tunisian ISO code = 788
    const returnUrl = "https://soomy.tn/windowPopup"; // return url if payment is success or failed
    const description = `Achat pack ${credit} Bitso, client: ${usernameClient}`; // description is describing what is happening to permform this payment

    const url = `https://test.clictopay.com/payment/rest/register.do?userName=${userName}&password=${password}&orderNumber=${orderNumber}&amount=${amount}&currency=${currency}&returnUrl=${returnUrl}&description=${description}`;

    //window popup configs css
    const height = window.innerHeight; //height of the popup window payment
    const width = 390; //Width of the popup window payment
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const features = `width=${width},height=${height},top=${top},left=${left}`;

    setIsLoading(true); // the backdrop and spinner loader (true = open)

    // Fetch prepared url
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const receivedFormUrl = data.formUrl;
        const orderId = data.orderId; // get orderId
        setOrderId(orderId);

        if (receivedFormUrl) {
          const popupWindow = window.open(receivedFormUrl, "_blank", features);
          setPopupWindow(popupWindow);
          setFirstUrl(receivedFormUrl);

          // check if popup is closed or not, if closed, will launch verifyOperation to verify if payment is success or fail
          const checkPopupClosed = setInterval(() => {
            if (popupWindow.closed) {
              clearInterval(checkPopupClosed);
              if (orderId) {
                launchVerifyOperation(orderId); // launch verifyOperation with extracted (from clicToPay server) OrderId
              }
            }
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const launchVerifyOperation = (orderId) => {
    const language = "fr";
    const url = `https://test.clictopay.com/payment/rest/getOrderStatus.do?userName=${userName}&password=${password}&orderId=${orderId}&language=${language}`;

    const orderStatusMessages = {
      0: "Paiement non éffectué.",
      1: "Paiement non éffectué.",
      2: "Paiement effectué avec succès.",
      3: "Paiement non éffectué.",
      4: "Paiement non éffectué.",
      5: "Paiement non éffectué.",
      6: "Paiement non éffectué.",
    };

    // verif if payment is success or fail with clicToPay server
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const receivedResponse = data;

        // clicToPay return orderStatus (if 2 === "success" ,else "fail")
        const orderStatus = receivedResponse.OrderStatus;

        let severity = "success";
        if ([0, 1, 3, 4, 5, 6].includes(orderStatus)) {
          severity = "warning";
        }

        setStatusMessage(orderStatusMessages[orderStatus]);

        setSeverity(severity); // set alert type "warning" or "success"
        setIsLoading(false); // close backdrop

        // in case success will dispatch to redux-toolkit (and then to axios) the next payload (type, user, service, montant, status, ref)
        if (orderStatus === 2) {
          dispatch(
            createCredit({
              type: `Pack Bitso ${credit}`,
              user: userInfo._id,
              service: "ClicToPay",
              montant: credit,
              status: "COMPLETED",
              ref: orderId,
            })
          ).then((data) => {
            if (data.payload.status === "COMPLETED") {
              // if response data is "COMPLETED"
              setStatusMessage(data.payload.message); // set alert message (statusMessage)
              dispatch(setResponsePayload(data.payload)); //dispatch (responsePayload) to redux-toolkit

              // dispatch for createPurchase pack
              let packId = props.selectedPack;
              dispatch(
                createPurchase({
                  pack_id: packId,
                  user_id: userInfo._id,
                  transaction_id: data.payload.transaction_id,
                })
              );
            }
          });
        }
      })
      .catch((error) => {
        // if error, ...
        setIsLoading(false); // close backdrop
        setStatusMessage("Error: ", error); // set error as alert message
      });
  };

  // handle to close popup
  const handleClickClosePopup = () => {
    if (popupWindow) {
      popupWindow.close(); // close popup
      setPopupWindow(null);
    }
    setIsLoading(false); // close backdrop
  };

  // the previously dispatched responsePayload will be selected from state
  const responsePayload = useSelector((state) => state.user.responsePayload);

  useEffect(() => {
    let timeoutId;

    if (responsePayload || responsePayload !== null) {
      // if there is a responsePayload
      timeoutId = setTimeout(() => {
        dispatch(setResponsePayload(null)); // remove responsePayload after 6 seconds (= remove success alert after 6 seconds automatically)
      }, 6000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, statusMessage, responsePayload]);

  return (
    <>
      {isLoading ? (
        <Backdrop open={isLoading}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress
              style={{ color: "#F9124E" }}
              thickness={7}
              size={80}
            />
            <h1 style={{ color: "#ffffff" }}>
              Traitement de l'achat, veuillez patienter
            </h1>
            <Button
              style={{ color: "#ffffff" }}
              onClick={handleClickClosePopup}
            >
              Annuler Achat
            </Button>
          </div>
        </Backdrop>
      ) : (
        <>
          {statusMessage && !responsePayload && showAlert && (
            <Alert severity={severity} style={{ marginBottom: "10px" }}>
              <div
                class="inner-alert"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span>{statusMessage}</span>
                <div style={{ marginLeft: "78px" }}>
                  <GrFormClose
                    style={{ cursor: "pointer" }}
                    onClick={handleCloseAlert}
                  />
                </div>
              </div>
            </Alert>
          )}
          {!statusMessage && responsePayload && showAlert && (
            <Alert
              severity={responsePayload.severity}
              style={{ marginBottom: "10px" }}
            >
              <div
                class="inner-alert"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span>{responsePayload.message}</span>
                <div style={{ marginLeft: "78px" }}>
                  <GrFormClose
                    style={{ cursor: "pointer" }}
                    onClick={handleCloseAlert}
                  />
                </div>
              </div>
            </Alert>
          )}
          {statusMessage && responsePayload && showAlert && (
            <Alert severity={severity} style={{ marginBottom: "10px" }}>
              <div
                class="inner-alert"
                style={{ display: "flex", alignItems: "center" }}
              >
                <span>{statusMessage}</span>
                <div style={{ marginLeft: "78px" }}>
                  <GrFormClose
                    style={{ cursor: "pointer" }}
                    onClick={handleCloseAlert}
                  />
                </div>
              </div>
            </Alert>
          )}

          <h1>Pack sélectionné:</h1>
          <div
            className="selectionned-pack"
            style={{ justifyContent: "center" }}
          >
            <Card sx={{ maxWidth: 130, marginBottom: "10px" }}>
              <CardMedia
                component="img"
                alt={credit + " Bitso"}
                height="140"
                image={image}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="pack-description"
                >
                  Valable pour <span>{validite}</span> enchéres
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="pack-price"
                >
                  <p className="pack-price-text">
                    <span>{prix}</span> Dinars
                  </p>
                </Typography>
              </CardContent>
            </Card>
          </div>

          <h5 style={{ fontWeight: "600" }}>Choisir méthode de payment:</h5>

          <div
            className="method-payment-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ButtonBase
              sx={{ maxWidth: 200, maxHeight: 260, cursor: "pointer" }}
              onClick={handleCardClick}
            >
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="carte-bancaire-text"
                  >
                    Carte Bancaire
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Payez avec:
                  </Typography>
                  <CardMedia
                    className="clicToPay-img"
                    component="img"
                    alt="ClicToPay logo"
                    image={clickToPayLogo}
                  />
                </CardContent>
              </Card>
            </ButtonBase>
            <span
              style={{
                fontFamily: "revansBold",
                fontWeight: "bold",
                fontSize: "x-large",
                margin: "5px",
              }}
            >
              OU
            </span>
            <ButtonBase
              sx={{ maxWidth: 200, maxHeight: 260, cursor: "pointer" }}
              onClick={() => props.setService("Carte bancaire")}
            >
              <Card
                sx={{ maxWidth: 200, maxHeight: 260, cursor: "pointer" }}
                onClick={() => props.setService("Paypal")}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="carte-bancaire-text"
                  >
                    <span style={{ visibility: "hidden" }}>Carte Bancaire</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Payez avec:
                  </Typography>
                  <CardMedia
                    className="sobflous-img"
                    component="img"
                    alt="Sobflous logo"
                    image={Sobflous}
                  />
                </CardContent>
              </Card>
            </ButtonBase>
          </div>
        </>
      )}
    </>
  );
};

export default PackModalMethodPay;
