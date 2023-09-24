import React, { useEffect, useState } from "react";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteRight,
  faAngleLeft,
  faAngleRight,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"; */
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createTransaction } from "../../../redux/transactionSlice";
import { ToastContainer } from "react-toastify";
import { getUser, setCloseModal } from "../../../redux/userSlice";
import {
  createOrder,
  getNumberOfOrders,
  getsingleOrder,
  updateOrder,
  validationMail,
} from "../../../redux/orderSlice";

const Validation = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userInfo, deconnectionLoading, connexionLoading, showModal } = user;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);


  const params = useParams();
  const product = params.id;
  const roomData = useSelector((state) => state.room);
  const { Room } = roomData;
  const order = useSelector((state) => state.order);
  const { NumberOfOrders, singleOrder } = order;

  const participation = useSelector((state) => state.participation);
  const { userParticipationList } = participation;

  /*  useEffect(() => {
    if (singleOrder&&(singleOrder?.user_id?._id!==userInfo?._id)) {
      navigate("/");
    }
  }, [navigate, userInfo,singleOrder]); */
  useEffect(() => {
    dispatch(getsingleOrder(product));
  }, [dispatch, product]);

  return (
    <div
      className={`${
        deconnectionLoading || connexionLoading
          ? "d-flex justify-content-center align-items-center"
          : "moving-main"
      }`}
      style={{
        height: `${deconnectionLoading || connexionLoading ? "100vh" : null}`,
      }}
    >
      {deconnectionLoading || connexionLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="fluid-container">
            <ToastContainer
              position="top-center"
              autoClose={10000}
              hideProgressBar={false}
              newestOnTop={false}
              toastStyle={{ backgroundColor: "#303030", color: "white" }}
              progressClassName="Toastify__progress-bar--warning"
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {/*header start*/}
            
            <div>
              <main className="pt-5">
                {singleOrder?.status_payment === "payé" ? (
                  <h2
                    className="checkout-title  mx-auto text-center mb-5"
                    style={{ color: "rgb(2, 202, 2)", fontSize: "38px" }}
                  >
                    {/*    <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ color: "#115817" }}
              />{" "} */}
                    <i class="fi fi-rr-shield-check"></i> Commande Validée{" "}
                  </h2>
                ) : (
                  <h2
                    className="checkout-title mx-auto text-center mb-5"
                    style={{ fontSize: "38px" }}
                  >
                    {" "}
                    Commande en Attente
                  </h2>
                )}
                <div className="g-3 needs-validation container d-flex p-2 mb-2 mx-auto justify-content-between main-checkout">
                  <div className="col-8 pe-lg-3 details-livraison-main">
                    <div className="col-12 checkout-form details-livraison p-3 edge-shadow">
                      <h3 className="text-left mt-0 mt-4">
                      Données de livraison
                      </h3>
                      <hr />
                      <div className="mt-0">
                        <label for="validationCustom01" className="form-label">
                          Nom :
                        </label>
                        <p>{singleOrder?.user_id?.lastName}</p>
                      </div>
                      <hr />
                      <div className="mt-0">
                        <label for="validationCustom01" className="form-label">
                          Prénom :
                        </label>
                        <p>{singleOrder?.user_id?.firstName}</p>
                      </div>
                      <hr />
                      <div className="mt-0">
                        <label for="validationCustom02" className="form-label">
                          Email :
                        </label>
                        <p>{singleOrder?.user_id?.email}</p>
                      </div>
                      <hr />
                      <div className="mt-0">
                        <label for="validationCustom02" className="form-label">
                        Téléphone :
                        </label>
                        <p>{singleOrder?.user_id?.phone}</p>
                      </div>
                      <hr />
                      <div className="mt-0">
                        <label for="validationCustom03" className="form-label">
                          Adresse :
                        </label>
                        <p>{singleOrder?.Adresse}</p>
                      </div>
                      <hr />
                      <div className="mt-0">
                        <label for="validationCustom03" className="form-label">
                          Ville :
                        </label>
                        <p>{singleOrder?.ville}</p>
                      </div>
                      <hr />
                      <div className="mt-0">
                        <label for="validationCustom04" className="form-label">
                        Code postal :
                        </label>
                        <p>{singleOrder?.zip}</p>
                      </div>
                      <hr />
                      <div className="mt-0">
                        <label for="validationCustom04" className="form-label">
                          Moyen de paiement :
                        </label>
                        <p>{singleOrder?.method_of_paiement}</p>
                      </div>
                    </div>
                    <div className="col-12 mt-2 checkout-form details-livraison p-3 edge-shadow">
                      <h3 className="text-left mt-0 mb-4">Paiement</h3>
                      <div className="mt-2">
                        <label  className="form-label">
                          Etat de Livraison :
                        </label>
                        <div
                          className="alert alert-secondary py-1 pe-2 m-1"
                          role="alert"
                        >
                          <p className="alert-link m-0">
                            {singleOrder?.status_delivery}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2">
                        <label for="validationCustom06" className="form-label">
                          Etat de Paiement :
                        </label>
                        {singleOrder?.status_payment === "payé" ? (
                          <div
                            className="alert alert-success py-1 pe-2 m-1"
                            role="alert"
                          >
                            <p className="alert-link m-0">payé</p>
                          </div>
                        ) : (
                          <div
                            className="alert alert-secondary py-1 pe-2 m-1 "
                            role="alert"
                          >
                            <p className="alert-link m-0">
                              {singleOrder?.status_payment}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-4 d-flex flex-column align-items-center checkout-details px-sm-2 p-lg-3 px-md-3 edge-shadow">
                    <h3 className="text-center mt-3">Votre Commande</h3>
                    <img
                      className="checkout-img edge-shadow"
                      src={singleOrder?.room_id?.product?.image?.imageURL}
                    />
                    <table className="table w-100">
                      <tbody className="details-checkout-body">
                        <tr className="table-light">
                          <td>Produit</td>
                          <td className="text-end">
                            {singleOrder?.room_id?.product?.title}
                          </td>
                        </tr>
                        <tr className="table-light">
                          <td>Garantie</td>
                          <td className="text-end">
                            {singleOrder?.room_id?.product?.garantie} Mois
                          </td>
                        </tr>
                        <tr className="table-light">
                          <td>Partenaire</td>
                          <td className="text-end p-1">
                            <img
                              className="card-img-partner m-0"
                              src={
                                singleOrder?.room_id?.product?.partner?.image
                                  ?.imageURL
                              }
                            />
                          </td>
                        </tr>
                        <tr className="table-light">
                          <td>Livraison</td>
                          <td className="text-end">---</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table total-table w-100">
                      <tbody className="total-body">
                        <tr className="table-light total-tr mt-5">
                          <td>Sous-total</td>
                          <td className="text-end">
                            {singleOrder?.typeWinner === "soomy"
                              ? singleOrder?.room_id?.prixPromo
                              : singleOrder?.room_id?.directPrice}{" "}
                            dt
                          </td>
                        </tr>
                        <tr className="table-light total-tr">
                          <td>Total</td>
                          <td className="text-end">
                            {singleOrder?.typeWinner === "soomy"
                              ? singleOrder?.room_id?.prixPromo
                              : singleOrder?.room_id?.directPrice}{" "}
                            td
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {!(singleOrder?.status_payment === "payé") &&
                      singleOrder &&
                      singleOrder.method_of_paiement === "carte bancaire" && (
                        <div className="paypal-button w-100 mt-4">
                          <PayPalScriptProvider
                            options={{ "client-id": "test" }}
                          >
                            <PayPalButtons
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [
                                    {
                                      amount: {
                                        value:
                                          singleOrder?.typeWinner === "soomy"
                                            ? singleOrder?.room_id?.prixPromo.toString()
                                            : singleOrder?.room_id?.directPrice?.toString(),
                                      },
                                    },
                                  ],
                                });
                              }}
                              onApprove={(data, actions) => {
                                return actions.order
                                  .capture()
                                  .then((details) => {
                                    const captures =
                                      details.purchase_units[0].payments
                                        .captures;
                                    dispatch(
                                      createTransaction({
                                        type: "paiement",
                                        total: parseFloat(
                                          captures[0].amount.value
                                        ),
                                        user: singleOrder?.user_id?._id,
                                        service:
                                          details.purchase_units[0]
                                            .soft_descriptor,
                                        montant:
                                          singleOrder?.typeWinner === "soomy"
                                            ? singleOrder?.room_id?.prixPromo
                                            : singleOrder?.room_id?.directPrice,
                                        status: captures[0].status,
                                        ref: captures[0].id,
                                      })
                                    )
                                      .then((data) => {
                                        dispatch(
                                          updateOrder({
                                            id: singleOrder?._id,
                                            data: {
                                              status_payment: "payé",
                                              status_delivery:
                                                "en attente de livraison",
                                              payment_id: data.payload._id,
                                            },
                                          })
                                        );
                                      })
                                      .then(() => {
                                        dispatch(
                                          validationMail({
                                            email: userInfo?.email,
                                            room_id: singleOrder?.room_id?._id,
                                            ref: singleOrder?.ref_order,
                                            name: singleOrder?.room_id?.product
                                              ?.title,
                                            method_of_paiement:
                                              singleOrder?.method_of_paiement,
                                            status_payment:
                                              singleOrder?.status_payment,
                                            prix: singleOrder?.room_id?.product
                                              ?.prix,
                                            prixPromo:
                                              singleOrder?.room_id?.prixPromo,
                                            image:
                                              singleOrder?.room_id?.product
                                                ?.image?.imageURL,
                                            order_id: singleOrder?._id,
                                          })
                                        ),
                                          dispatch(getsingleOrder(product));
                                      });
                                    setTransaction(true);
                                  });
                              }}
                            />
                          </PayPalScriptProvider>
                        </div>
                      )}
                  </div>
                </div>
              </main>
            </div>
            <Footer />

            {/*footer end*/}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Validation;
