import React, { useEffect, useState } from "react";
import {
  createCredit,
  setCloseModalCredit,
  setsold,
  setModalTab,
} from "../redux/userSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Typography, Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import PackModalBuy from "./modals/creditModal/PackModalBuy";
import PackModalSelection from "./modals/creditModal/PackModalSelection";
import PackModalMethodPay from "./modals/creditModal/PackModalMethodPay";

const CreditModal = (props) => {
  const [verif, setVerif] = useState(false);
  const [personal, setPersonal] = useState(false);
  const [firstFieldset, setFirstFieldset] = useState(true);
  const [secondFieldset, setSecondFieldset] = useState(false);
  const [thirdFieldset, setThirdFieldset] = useState(false);
  const [service, setService] = useState();
  const [montant, setMontant] = useState();
  const valueTab = useSelector((state) => state.user.modalTab);
  const [value, setValue] = useState(valueTab);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [currentStep, setCurrentStep] = useState("buy");
  const [selectedPack, setSelectedPack] = useState();

  const handleRechargeClick = () => {
    setShowPaymentOptions(true);
    setCurrentStep("pay");
  };

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  /*   const purchase = useSelector((state) => state.purchase);
  const { selectedPurchasedPack } = purchase; */

  const toggleProgressBar = () => {
    if (secondFieldset && verif) {
      setSecondFieldset(false);
      setThirdFieldset(true);
      setPersonal(true);
      setMontant();
    } else if (firstFieldset) {
      setFirstFieldset(false);
      setSecondFieldset(true);
      setVerif(true);
    }
  };
  const clearModal = () => {
    setSecondFieldset(false);
    setThirdFieldset(false);
    setPersonal(false);
    setFirstFieldset(true);
    setSecondFieldset(false);
    setThirdFieldset(false);
    setVerif(false);
    setMontant();
    setService();
    dispatch(setCloseModalCredit());
  };

  // update modalTab action
  useEffect(() => {
    setValue(valueTab);
  }, [valueTab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // dispatch(setModalTab(newValue));
    if (newValue === 0) {
      setCurrentStep("buy");
    }
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, backgroundColor: "#F2BCCA" }}>
            <Typography>
              {value === 0 &&
                (currentStep === "buy" ? (
                  <PackModalBuy
                    handleRechargeClick={handleRechargeClick}
                    setSecondFieldset={setSecondFieldset}
                    setSelectedPack={setSelectedPack}
                  />
                ) : (
                  <PackModalMethodPay
                    service={service}
                    setService={setService}
                    selectedPack={selectedPack}
                    setCurrentStep={setCurrentStep}
                  />
                ))}
              {value === 1 && (
                <PackModalSelection
                  setCurrentStep={setCurrentStep}
                  setValue={setValue}
                />
              )}
            </Typography>
          </Box>
        )}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Modal {...props} onHide={clearModal} centered>
      <div className="modal-dialog modal-dialog-centered m-0" role="document">
        <div className="modal-content">
          <form>
            <Modal.Header>
              <div className="circle-icon" style={{ marginBottom: "0px" }}>
                <i className="fi fi-rr-coins"></i>
              </div>
            </Modal.Header>
            <Modal.Body className="credit-modal-body">
              {/* <ul id="progressbarCredit">
                <li className="active" id="montant"></li>
                <li id="pay" className={`${verif ? "active" : null}`}></li>
                <li
                  id="success"
                  className={`${personal ? "active" : null}`}
                ></li>
              </ul> */}
              <fieldset className={`${firstFieldset ? null : "d-none"}`}>
                {/* {selectedPurchasedPack && (
                  <h4 className="modal-title" id="exampleModalCenterTitle">
                    Votre pack sélectionné est :{" "}
                    <span style={{ color: "#3a0412", fontSize: "26px" }}>
                      {selectedPurchasedPack?.credit}{" "}
                      <span>BITSO</span>
                    </span>
                  </h4>
                )} */}
                <br />
                {/* ------------------------------------------start------------------------------------------------ */}
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      variant="fullWidth"
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: "#150006",
                        },
                      }}
                    >
                      <Tab
                        label={
                          <span
                            style={{
                              color: value === 0 ? "black" : undefined,
                            }}
                          >
                            Acheter Packs
                          </span>
                        }
                        {...a11yProps(0)}
                        sx={{
                          bgcolor: value === 0 ? "#F2BCCA" : undefined,
                          color: value === 0 ? "black" : undefined,
                        }}
                      />
                      <Tab
                        label={
                          <span
                            style={{
                              color: value === 1 ? "black" : undefined,
                            }}
                          >
                            Mes Packs
                          </span>
                        }
                        {...a11yProps(1)}
                        sx={{
                          bgcolor: value === 1 ? "#F2BCCA" : undefined,
                        }}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} />
                  <TabPanel value={value} index={1} />
                </Box>

                {/* -------------------------méthodes de payment: paypal ou carte credit--------------------------------- */}

                {/* {showPaymentOptions && (
                  <PackModalMethodPay
                    service={service}
                    setService={setService}
                  />
                )} */}

                {/* -------------------------Bouton "suivant" et "retour"--------------------------------- */}

                {secondFieldset && (
                  <div>
                    <button
                      type="button"
                      name="next"
                      className="next action-button btn w-100"
                      onClick={toggleProgressBar}
                      // disabled={service ? false : true}
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      name="next"
                      className="next action-button btn w-100"
                      onClick={clearModal}
                      // disabled={service ? false : true}
                    >
                      Retour
                    </button>
                  </div>
                )}
                <div className="button-container">
                  {currentStep === "pay" && (
                    <div className="button-wrapper">
                      <button
                        type="button"
                        name="next"
                        className="next action-button btn w-40"
                        // disabled={service ? false : true}
                        onClick={() => {
                          setCurrentStep("buy");
                        }}
                      >
                        Retour
                      </button>
                    </div>
                  )}
                  <div className="button-wrapper">
                    {firstFieldset && (
                      <button
                        type="button"
                        name="next"
                        className="next action-button btn w-40"
                        onClick={() => {
                          clearModal(), setCurrentStep("buy");
                        }}
                        // disabled={service ? false : true}
                      >
                        Fermer
                      </button>
                    )}
                  </div>
                </div>
              </fieldset>
              <fieldset className={`${secondFieldset ? null : "d-none"}`}>
                <table className="table table-bordered mb-1">
                  <tbody>
                    <tr>
                      <td className="black">Votre crédit actuel:</td>
                      <td className="black">
                        {" "}
                        {props.montant == null
                          ? userInfo?.credit?.montant?.toFixed(2)
                          : props.montant?.toFixed(2)}{" "}
                        DT{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="black">Montant de recharge :</td>
                      <td className="black">{montant} DT</td>
                    </tr>
                    <tr>
                      <td className="black">Moyen de paiement :</td>
                      <td className="yellow">{service}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                {/* {service === "Paypal" && secondFieldset ? (
                  <PayPalScriptProvider options={{ "client-id": "test" }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: montant.toString(),
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
                            createCredit({
                              type: "credit",
                              total: parseFloat(captures[0].amount.value),
                              user: userInfo._id,
                              service:
                                details.purchase_units[0].soft_descriptor,
                              montant: montant,
                              status: captures[0].status,
                              ref: captures[0].id,
                            })
                          ).then((data) => {
                            if (data.payload.status === "COMPLETED") {
                              setSecondFieldset(false);
                              setThirdFieldset(true);
                              setPersonal(true);
                              dispatch(setsold(data.payload.montant));
                            }
                          });
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                ) : null} */}

                {service === "Carte bancaire" && secondFieldset ? (
                  <button
                    className="mb-2 w-100"
                    style={{
                      backgroundColor: "#0070ba",
                      color: "#fff",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#00649c";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#0070ba";
                    }}
                    // onClick={handleCardPayment}
                  >
                    Achetez Crédits
                  </button>
                ) : null}

                <button
                  type="button"
                  name="next"
                  className="next action-button btn btn-primary btn-color w-100"
                  onClick={() => {
                    setFirstFieldset(true);
                    setSecondFieldset(false);
                  }}
                >
                  Retour
                </button>
              </fieldset>
              <fieldset className={`${thirdFieldset ? null : "d-none"}`}>
                <div className="form-card">
                  <div className="row justify-content-center text-center"></div>
                  <br />
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-9 text-center">
                      <h3 className="warning-connection">
                        Vous avez rechargé votre crédit avec un montant de{" "}
                        <span className="color-pink">
                          {Number(montant)?.toFixed(2)} DT{" "}
                        </span>
                      </h3>
                      <p className="warning-text">
                        Nouveau crédit :{" "}
                        <span>{userInfo?.credit?.montant?.toFixed(2)} DT</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------END---------------------------------------------------------- */}
                <br />
                <br />
              </fieldset>
            </Modal.Body>
            <Modal.Footer
              className={`${thirdFieldset ? null : "d-none"}`}
              style={{ flexWrap: "nowrap" }}
            >
              <button
                className="btn btn-outline-cancel w-100"
                onClick={() => {
                  clearModal;
                }}
              >
                Ok
              </button>
            </Modal.Footer>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreditModal;
