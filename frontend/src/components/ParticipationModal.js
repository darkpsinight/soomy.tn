import React, { useState, useEffect } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createParticipation } from "../redux/participationSlice";
import { updateRoom, fetchRoom } from "../redux/roomSlice";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Modal from "react-bootstrap/Modal";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  ButtonBase,
} from "@mui/material";
import Sobflous from "../assets/images/sobflous.png";
import clickToPayLogo from "../assets/images/click-to-pay 2.png";
import { v4 as uuidv4 } from "uuid";

const ParticipationModal = (props) => {
  const dispatch = useDispatch();
  const [firstFieldset, setFirstFieldset] = useState(true);
  const [secondFieldset, setSecondFieldset] = useState(false);
  const [show, setShow] = useState(true);
  const [verif, setVerif] = useState(false);

  const [firstUrl, setFirstUrl] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userName, setUserName] = useState("2812800148");
  const [password, setPassword] = useState("vBg8d3C2");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popupWindow, setPopupWindow] = useState(null);
  const [severity, setSeverity] = useState("success");
  const [showAlert, setShowAlert] = useState(true);

  const participation = useSelector((state) => state.participation);
  const { loadingcreateParticipation, createParticipationErrors } =
    participation;

  const auction = props.room;

  // console.log('auction: ', auction)

  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  // const usernameClient = useSelector((state) => state.user.userInfo.username);

  // const packs = useSelector((state) => state.pack.Packs);

  const generateOrderNumber = () => {
    const orderNumber = uuidv4().replace(/-/g, "").substring(0, 32);
    return orderNumber;
  };

  const handleCardClick = () => {
    const userName = "2812800148";
    const password = "vBg8d3C2";
    const orderNumber = generateOrderNumber();
    const amount = auction?.participationPrice * 1000;
    const currency = 788;
    const returnUrl = "http://soomy.tn/windowPopup";
    const description = `Paiment d'inscription à l'enchére suivant: (Produit: ${
      auction?.product?.title
    }, Type: ${auction?.niveau}, Categorie: ${auction?.roomCategory}, ID: ${
      auction?.product?._id
    }),par le client: ${user?.userInfo?.username}, à la date: ${format(
      new Date(),
      "dd/MM/yyyy,HH:mm"
    )}`;

    const url = `https://test.clictopay.com/payment/rest/register.do?userName=${userName}&password=${password}&orderNumber=${orderNumber}&amount=${amount}&currency=${currency}&returnUrl=${returnUrl}&description=${description}`;

    //window popup configs css
    const height = window.innerHeight; //height of the popup window payment
    const width = 390; //Width of the popup window payment
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const features = `width=${width},height=${height},top=${top},left=${left}`;

    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const receivedFormUrl = data.formUrl;
        const orderId = data.orderId;
        setOrderId(orderId);
        // console.log("orderId: ", orderId);

        if (receivedFormUrl) {
          const popupWindow = window.open(receivedFormUrl, "_blank", features);
          console.log("ClicToPay Form Url: ", receivedFormUrl);
          setPopupWindow(popupWindow);
          setFirstUrl(receivedFormUrl);

          const checkPopupClosed = setInterval(() => {
            if (popupWindow.closed) {
              console.log("Popup window has been closed.");
              clearInterval(checkPopupClosed);
              if (orderId) {
                launchVerifyOperation(orderId);
              }
            } else {
              console.log("Popup window still open!");
            }
          }, 1000);
        }
      })
      .catch((error) => {
        console.log("Error fetching formUrl:", error);
      });
  };

  const launchVerifyOperation = (orderId) => {
    const language = "fr";
    console.log("CLOSED, launch the verify operation");
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

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const receivedResponse = data;

        const orderStatus = receivedResponse.OrderStatus;

        console.log("Order Status:", orderStatus);

        let severity = "success";
        if ([0, 1, 3, 4, 5, 6].includes(orderStatus)) {
          severity = "warning";
        }

        console.log(
          "TEST 1 orderStatusMessages[orderStatus]: ",
          orderStatusMessages[orderStatus]
        );

        setStatusMessage(orderStatusMessages[orderStatus]);
        // dispatch(setStatusMessage(orderStatusMessages[orderStatus]));

        console.log("TEST 2 statusMessage: ", statusMessage);

        setSeverity(severity);
        setIsLoading(false);

        if (orderStatus === 2) {
          console.log("order status est 2");
          console.log("Dispatching createParticipation");
          dispatch(
            createParticipation({
              type: "Participation",
              total: auction?.participationPrice,
              user: userInfo?._id,
              email: userInfo?.email,
              service: "ClicToPay",
              image: auction?.product?.image?.imageURL,
              montant: auction?.participationPrice, // à fixer
              status: "COMPLETED",
              ref: orderId,
              name: auction?.product?.title,
              prix: auction?.product?.prix,
              room: auction?._id,
              category: auction?.roomCategory,
              username: userInfo?.username,
            })
          ).then(({ payload, error }) => {
            if (!error) {
              setFirstFieldset(false);
              setSecondFieldset(true);
              setVerif(true);
              console.log("Dispatching updateRoom");
              dispatch(
                updateRoom({
                  id: auction?._id,
                  data: {
                    participation: auction.participation + 1,
                  },
                })
              );
            }
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setStatusMessage("Error: ", error);
        console.log("Error:", error);
      });
  };

  const handleClickClosePopup = () => {
    if (popupWindow) {
      popupWindow.close();
      setPopupWindow(null);
    }
    setIsLoading(false);
  };

  const responsePayload = useSelector((state) => state.user.responsePayload);
  // console.log(statusMessage);
  // console.log(responsePayload);

  useEffect(() => {
    let timeoutId;

    if (responsePayload || responsePayload !== null) {
      timeoutId = setTimeout(() => {
        dispatch(setResponsePayload(null));
      }, 6000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, statusMessage, responsePayload]);

  return (
    <Modal {...props} centered>
      <div className="modal-dialog modal-dialog-centered m-0" role="document">
        <div className="modal-content">
          <form>
            <Modal.Header>
              <div className="circle-icon">
                <i className="fi fi-rr-coins"></i>
              </div>
            </Modal.Header>
            <Modal.Body>
              <h4 className="modal-title text-center w-100 my-0">
                Informations de Participation
              </h4>
              <fieldset className={`${firstFieldset ? null : "d-none"}`}>
                <table className="table table-bordered mt-2 mb-1">
                  <tbody>
                    <tr>
                      <td className="black">Enchère :</td>
                      <td className="black"> {auction?.product?.title} </td>
                    </tr>
                    <tr>
                      <td className="black">Date de début :</td>
                      <td className="black">
                        {format(new Date(), "dd/MM/yyyy,HH:mm")}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="black">Sous total : </td>
                      <td className="yellow">
                        {auction?.participationPrice} DT{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="black">Total : </td>
                      <td className="yellow">
                        {auction?.participationPrice} DT{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />

                {auction && (
                  <div>
                    {/* <PayPalScriptProvider options={{ "client-id": "test" }}>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value:
                                    auction?.participationPrice?.toString(),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            const captures =
                              details.purchase_units[0].payments.captures;
                            dispatch(
                              createParticipation({
                                type: "participation",
                                total: parseFloat(captures[0].amount.value),
                                user: userInfo?._id,
                                email: userInfo?.email,
                                service:
                                  details?.purchase_units[0]?.soft_descriptor,
                                image: auction?.product?.image?.imageURL,
                                montant: auction?.participationPrice,
                                status: captures[0].status,
                                ref: captures[0]?.id,
                                name: auction?.product?.title,
                                prix: auction?.product?.prix,
                                room: auction?._id,
                                category: auction?.roomCategory,
                                username: userInfo?.username,
                              })
                            ).then(({ payload, error }) => {
                              if (!error) {
                                setFirstFieldset(false);
                                setSecondFieldset(true);
                                setVerif(true);
                                dispatch(
                                  updateRoom({
                                    id: auction?._id,
                                    data: {
                                      participation: auction.participation + 1,
                                    },
                                  })
                                );
                              }
                            });
                          });
                        }}
                      />
                    </PayPalScriptProvider> */}

                    <h5
                      style={{
                        fontFamily: "revansBold",
                        fontWeight: "bold",
                        fontSize: "x-large",
                        margin: "5px",
                        marginBottom: "25px",
                      }}
                    >
                      Choisir le mode de payment:
                    </h5>

                    <div
                      className="method-payment-container"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <ButtonBase
                        sx={{
                          maxWidth: 200,
                          maxHeight: 260,
                          cursor: "pointer",
                        }}
                        onClick={handleCardClick}
                      >
                        <Card style={{ backgroundColor: "#F2BCCA" }}>
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
                        sx={{
                          maxWidth: 200,
                          maxHeight: 260,
                          cursor: "pointer",
                        }}
                        // onClick={() => props.setService("Carte bancaire")}
                      >
                        <Card
                          style={{ backgroundColor: "#F2BCCA" }}
                          // onClick={() => props.setService("Paypal")}
                        >
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              className="carte-bancaire-text"
                            >
                              <span style={{ visibility: "hidden" }}>
                                Carte Bancaire
                              </span>
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
                  </div>
                )}
                <div>
                  {loadingcreateParticipation ? (
                    <div className="col-md-12 align-items-center jusify-content-center d-flex">
                      <div className="spinner-border mx-auto" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : createParticipationErrors ? (
                    <div className="alert alert-danger" role="alert">
                      {createParticipationErrors}
                    </div>
                  ) : null}
                </div>
              </fieldset>
              <fieldset className={`${secondFieldset ? null : "d-none"}`}>
                <div className="form-card">
                  <div className="row justify-content-center text-center"></div>
                  <br />
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-9 text-center">
                      <h4 className=" text-center">
                        Votre inscription a été payé avec succés
                      </h4>
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </fieldset>
            </Modal.Body>
            <Modal.Footer style={{ flexWrap: "nowrap" }}>
              <button
                className="btn btn-outline-cancel w-100"
                onClick={(e) => {
                  props.onHide();
                  e.preventDefault();
                  /* setShow(false);
                  props.participationCallback(show); */
                }}
              >
                Fermer
              </button>
            </Modal.Footer>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ParticipationModal;
