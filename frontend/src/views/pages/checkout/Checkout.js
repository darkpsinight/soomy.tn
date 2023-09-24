import React, { useEffect, useState } from "react";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons"; */

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser, setCloseModal } from "../../../redux/userSlice";

import {

  getOrderByRoom,

  updateOrder,
  validationMail,
} from "../../../redux/orderSlice";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [radio1, setRadio1] = useState(false);
  const [radio2, setRadio2] = useState(true);
  const [radio3, setRadio3] = useState(true);

  const { userInfo, deconnectionLoading, connexionLoading, showModal } = user;
  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [email, setEmail] = useState(userInfo?.email);
  const [adress, setAdresse] = useState(userInfo?.Adresse);
  const [ville, setVille] = useState("");
  const [zip, setZip] = useState("");
  const [notes, setNotes] = useState("");
  const [paiement, setPaiement] = useState("carte bancaire");
  const [livraison, setLivraison] = useState("en attente de paiement");
  const params = useParams();
  const product = params.id;
  const roomData = useSelector((state) => state.room);
  const order = useSelector((state) => state.order);
  const {  singleOrder } = order;
/* 
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
 */
  useEffect(() => {
    dispatch(getOrderByRoom({room:product,user:userInfo?._id}));
  }, [dispatch, product]);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
 /*  useEffect(() => {
    if (singleOrder?.method_of_paiement) {
      navigate(`/validation/${singleOrder?._id}`);
    }
  }, [dispatch, singleOrder]); */

  const participation = useSelector((state) => state.participation);
  const { userParticipationList } = participation;
  const sendDelivery = (e) => {
    e.preventDefault();
    dispatch(
      updateOrder({
        id: singleOrder?._id,
        data: {
          date: new Date(),
          nom: firstName,
          Adresse: adress,
          email: email,
          phone: phone,
          zip: zip,
          ville: ville,
          method_of_paiement: paiement,
          status_payment: livraison,
          notes: notes,
        },
      })
    )
    
      .then((data) => navigate(`/validation/${singleOrder?._id}`))
      
  };

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
              <h2 className="checkout-title mx-auto text-center mb-5" style={{ fontSize: "38px" }}> Validation de commande</h2>
                <form
                  className="g-3 needs-validation container d-flex p-2 mb-2 mx-auto justify-content-between main-checkout"
                  novalidate
                  onSubmit={(e) => sendDelivery(e)}
                >
                  <div className="checkout-form edge-shadow p-3">
                    <h3 className="text-left mt-0 mb-4">
                      Informations Personelles
                    </h3>
                    <div className="mt-2">
                      <label for="validationCustom01" className="form-label">
                      Prénom *
                      </label>
                      <input
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        value={firstName}
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        required
                      />
                      <div className="invalid-feedback">
                        Veuillez fournir un code postal valide.
                      </div>
                    </div>
                    <div className="mt-2">
                      <label for="validationCustom02" className="form-label">
                        Nom *
                      </label>
                      <input
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        value={lastName}
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        required
                      />
                      <div className="invalid-feedback">
                        Veuillez fournir un code postal valide.
                      </div>
                    </div>
                    <div className="d-flex w-100">
                      <div className="mt-2 me-1 w-100">
                        <label for="validationCustom01" className="form-label">
                          Email *
                        </label>
                        <input
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          value={email}
                          type="email"
                          className="form-control"
                          id="validationCustom03"
                          required
                        />
                        <div className="valid-feedback">Cela semble bon!</div>
                      </div>
                      <div className="mt-2 ms-1 w-100">
                        <label for="validationCustom03" className="form-label">
                          Téléphone *
                        </label>
                        <input
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          value={phone}
                          type="text"
                          className="form-control"
                          id="validationCustom04"
                          required
                        />
                        <div className="valid-feedback">Cela semble bon!</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label for="validationCustom05" className="form-label">
                        Adresse
                      </label>
                      <input
                        onChange={(e) => {
                          setAdresse(e.target.value);
                        }}
                        value={adress}
                        type="text"
                        className="form-control"
                        id="validationCustom05"
                      />
                      <div className="invalid-feedback">
                        Veuillez fournir une rue valide.
                      </div>
                    </div>

                    <div className="mt-2">
                      <label for="validationCustom06" className="form-label">
                        Ville *
                      </label>
                      <select
                        onChange={(e) => setVille(e.target.value)}
                        className="form-select"
                        id="validationCustom06"
                        required
                      >
                        <option selected disabled value="">
                          Choisir...
                        </option>
                        <option>Tunis</option>
                        <option>Bizert</option>
                        <option>Ariana</option>
                        <option>Bèja</option>
                        <option>Ben Arous</option>
                        <option>Gafsa</option>
                        <option>Kairouane</option>
                        <option>Gabès</option>
                        <option>Mahdia</option>
                        <option>Monastir</option>
                        <option>Sousse</option>
                        <option>Kasserine</option>
                        <option>Nabeul</option>
                        <option>Tatouine</option>
                        <option>Zaghouane</option>
                        <option>Tozeur</option>
                        <option>Siliana</option>
                        <option>Jendouba</option>
                        <option>Sidi Bouzid</option>
                        <option>Kef</option>
                        <option>Kebili</option>
                        <option>Manouba</option>
                        <option>Mednine</option>
                      </select>
                      <div className="invalid-feedback">
                        Veuillez sélectionner un état valide.
                      </div>
                    </div>

                    <div className="mt-2">
                      <label for="validationCustom07" className="form-label">
                      Code postal
                      </label>
                      <input
                        onChange={(e) => setZip(e.target.value)}
                        type="text"
                        className="form-control"
                        id="validationCustom07"
                      />
                    </div>
                    <div className="mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="invalidCheck"
                          required
                        />
                        <label className="form-check-label" for="invalidCheck">
                          Accepter les termes et conditions
                        </label>
                        <div className="invalid-feedback">
                          Vous devez accepter avant de soumettre le formulaire.
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label for="validationCustom08" className="form-label">
                      information supplémentaire (Facultative)
                      </label>
                      <textarea
                        type="text"
                        className="form-control mt-1"
                        id="validationCustom08"
                        placeholder="Commentaires concernant votre commande, ex. : consignes de livraison."
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-5 d-flex flex-column align-items-center justify-content-center checkout-details px-sm-2 p-lg-4 px-md-3 edge-shadow">
                    <h3 className="text-center mt-3">Votre Commande</h3>
                    <img
                      className="checkout-img mb-3 edge-shadow"
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
                            {" "}
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
                            {singleOrder?.typeWinner==="soomy"?singleOrder?.room_id?.prixPromo:singleOrder?.room_id?.directPrice} dt
                          </td>
                        </tr>
                        <tr className="table-light total-tr">
                          <td>Total</td>
                          <td className="text-end">
                          {singleOrder?.typeWinner==="soomy"?singleOrder?.room_id?.prixPromo:singleOrder?.room_id?.directPrice} dt
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      className="accordion accordion-checkout w-100 mb-2"
                      id="accordionPanelsStayOpenExample"
                    >
                      {/*<div className="accordion-item accordion-item-checkout">
                        <h4
                          className="accordion-header accordion-header-checkout"
                          id="panelsStayOpen-headingOne"
                        >
                          <input
                            checked={!radio1}
                            type="radio"
                            name="methodPaiment"
                            onClick={(e) => {
                              setPaiement("carte bancaire");
                              setLivraison("en attente");
                              setRadio1(!e.target.checked);
                              setRadio2(true);
                              setRadio3(true);
                            }}
                            data-bs-toggle="collapse"
                            id="AccordionItem1"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne"
                          />
                          <label className="checkout-label" for="AccordionItem1">
                            Carte Bancaire
                          </label>
                        </h4>
                        <div
                          id="panelsStayOpen-collapseOne"
                          className={`accordion-collapse ${radio1 && "collapse"}`}
                          aria-labelledby="panelsStayOpen-headingOne"
                        >
                          <div className="accordion-body accordion-body-checkout">
                            <p className="mb-1">
                              Payer en ligne maintenant, par carte bancaire
                              tunisienne en toute sécurité.
                            </p>
                             <img
                              className="checkout-visa"
                              src={cards}
                              alt="paiment-cards"
                            ></img> 
                          </div>
                        </div>
                      </div>*/}
                      <div className="accordion-item accordion-item-checkout">
                        <h4
                          className="accordion-header accordion-header-checkout"
                          id="panelsStayOpen-headingTwo"
                        >
                          <input
                            checked={!radio2}
                            className="collapsed"
                            onClick={(e) => {
                              setPaiement("virement bancaire");
                              setLivraison("en attente de virement");
                              setRadio1(true);
                              setRadio2(!e.target.checked);
                              setRadio3(true);
                            }}
                            type="radio"
                            name="methodPaiment"
                            id="AccordionItem2"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseTwo"
                          />
                          <label className="checkout-label" for="AccordionItem2">
                            Virement Bancaire
                          </label>
                        </h4>
                        <div
                          id="panelsStayOpen-collapseTwo"
                          className={`accordion-collapse ${radio2 && "collapse"}`}
                          aria-labelledby="panelsStayOpen-headingTwo"
                        >
                          <div className="accordion-body accordion-body-checkout">
                            <p>
                              {" "}
                              Effectuez le paiement directement depuis votre
                              compte bancaire. Veuillez utiliser l’ID de votre
                              commande comme référence du paiement. Votre
                              commande ne sera pas expédiée tant que les fonds
                              ne seront pas reçus.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item accordion-item-checkout">
                        <h4
                          className="accordion-header accordion-header-checkout"
                          id="panelsStayOpen-headingThree"
                        >
                          <input
                            checked={!radio3}
                            className="collapsed"
                            onClick={(e) => {
                              setPaiement("en attente");
                              setLivraison("en attente de livraison");
                              setRadio1(true);
                              setRadio2(true);
                              setRadio3(!e.target.checked);
                            }}
                            id="AccordionItem3"
                            name="methodPaiment"
                            type="radio"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseThree"
                          />
                          <label className="checkout-label" for="AccordionItem3">
                            Paiement à la Livraison
                          </label>
                        </h4>
                        <div
                          id="panelsStayOpen-collapseThree"
                          className={`accordion-collapse ${radio3 && "collapse"}`}
                          aria-labelledby="panelsStayOpen-headingThree"
                        >
                          <div className="accordion-body accordion-body-checkout">
                            <p>
                              Régler votre commande en espèce, à la livraison.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 button-box w-100">
                      <button
                        className="btn btn-outline-checkout w-100"
                        type="submit"
                      >
                        Valider
                      </button>
                    </div>
                  </div>
                </form>
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

export default Checkout;