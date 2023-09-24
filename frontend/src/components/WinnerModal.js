/* import {
    faArrowLeft,
    faArrowRight,
    faAward,
    faCheckCircle,
    faDollarSign,
    faDonate,
    faMedal,
    faMobileAlt,
    faTag,
    faTrophy,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; */
import React, { useState, useEffect, useCallback } from "react";

//  import trophy from "../assets/trophy.png";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
// import { createOrder, getNumberOfOrders } from "../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const WinnerModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  /*   const order = useSelector((state) => state.order);
    const { NumberOfOrders } = order;
     useEffect(() => {
      dispatch(getNumberOfOrders());
    }, []); */
  return (
    <Modal {...props} centered>
      <div className="modal-dialog modal-dialog-centered m-0" role="document">
        <div className="modal-content">
          <form>
            <Modal.Header>
              {/*<h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>*/}
              <div className="circle-icon">
                <i className="fi fi-rr-trophy"></i>
              </div>
            </Modal.Header>
            <Modal.Body className="p-0 mb-2">
              <div className="form-card">
                <div className="row justify-content-center">
                  <div className="col-9 text-center">
                    {props.winner ? (
                      <>
                        <h3 className="warning-connection mt-3">
                          Félicitations!
                        </h3>
                        <p className="warning-text">
                          Vous avez remporté l'enchère suivante. Nous vous
                          invitons a confirmer votre commande, afin que nous
                          vous livrons le produit.
                        </p>
                        <img
                          className="modal-img-winner"
                          src={props.room?.product?.image?.imageURL}
                        />

                        <div className="col-lg-12 mt-5">
                          <p className="tag-section-modal">
                            <strong>
                              {" "}
                              {/*   <FontAwesomeIcon
                                            icon={faTag}
                                            style={{ marginRight: "10px" , color:"rgb(30, 63, 102)" }}
                                          /> */}
                              Prix Original{" "}
                            </strong>
                            <span className="floating">
                              {props?.room?.product?.prix} DT
                            </span>{" "}
                          </p>
                          <hr className="p-0 m-0" />
                          <p className="tag-section-modal">
                            <strong>
                              {" "}
                              {/*  <FontAwesomeIcon
                                            icon={faDollarSign}
                                            style={{ marginRight: "10px" , color:"rgb(30, 63, 102)"  }}
                                          /> */}
                              Prix Promo{" "}
                            </strong>
                            <span className="floating">
                              {props?.room?.prixPromo} dt
                            </span>{" "}
                          </p>
                          <hr className="p-0 m-0" />

                          {props.room?.product?.garantie ? (
                            <>
                              <p className="tag-section-modal">
                                <strong>
                                  {" "}
                                  {/*  <FontAwesomeIcon
                                            icon={faAward}
                                            style={{ marginRight: "10px" , color:"rgb(30, 63, 102)"  }}
                                          /> */}
                                  Garantie{" "}
                                </strong>
                                <span className="floating">
                                  {" "}
                                  {props.room?.product?.garantie} Mois
                                </span>{" "}
                              </p>
                              <hr className="p-0 m-0" />
                            </>
                          ) : null}

                          {/*<hr className="p-0 m-0 d-none d-lg-block">
                                          <p className="tag-section d-none d-lg-block"><strong> <i className="fas fa-user"></i>  Nombre de participants <span className="floating">---</span> </strong></p>*/}
                        </div>
                        <button
                          className="btn btn-outline-checkout my-4 "
                          style={{ textDecoration: "none" }}
                          onClick={() =>
                            navigate(`/checkout/${props.room._id}`)
                          }
                        >
                          Commander{" "}
                          {/* <FontAwesomeIcon icon={faArrowRight} /> */}
                        </button>
                      </>
                    ) : props.loser ? (
                      <>
                        <h3 className="warning-connection">Pas de chance!</h3>
                        <p className="warning-text mb-3">
                          Vous avez perdu cette enchère. Tentez votre chance la
                          prochaine fois. Merci pour votre participation.
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="warning-connection my-2">
                          Enchère Terminé!
                        </h3>
                        {props.winner ? (
                          <p className="warning-text">
                            L'enchère à été remporté par {props.winner} à{" "}
                            {props?.room?.prixPromo} DT
                          </p>
                        ) : null}
                        <p className="warning-text mb-2"></p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Modal.Body>
            {!props.winner ? (
              <Modal.Footer style={{ flexWrap: "nowrap" }}>
                <button
                  className="btn btn-outline-cancel w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    setShow(false);
                    props.winnerCallback(show);
                  }}
                >
                  OK
                </button>
              </Modal.Footer>
            ) : null}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default WinnerModal;
