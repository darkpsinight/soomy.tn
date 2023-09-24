/*import {
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
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";*/
import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
// import { createOrder, getNumberOfOrders } from "../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateRoom } from "../redux/roomSlice";
import { createOrder } from "../redux/orderSlice";
const DirectPurchaseModal = (props) => {
  const { room, user, parentCallback, counter, email, ...rest } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auction } = useSelector((state) => state.room);
  const { userInfo } = useSelector((state) => state.user);
  const [show, setShow] = useState(true);
  return (
    <Modal {...rest}  centered>
      <div className="modal-dialog modal-dialog-centered m-0" role="document">
        <div className="modal-content">
          <form>
            <Modal.Header>
              {/*<h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>*/}
              <div className="circle-icon">
                <i className="fi fi-rr-bullseye"></i>
              </div>
            </Modal.Header>
            <Modal.Body className="p-0 mb-2">
              <div className="form-card">
                <div className="row justify-content-center">
                  <div className="col-9 text-center">
                    <>
                      <h3 className="warning-connection mt-3">Ne manquez pas cette chance !</h3>
                      <p className="warning-text">
                      Vous pouvez acheter directement ce produit sans
attendre la fin.
                      </p>
                      <img
                        className="modal-img-winner"
                        src={auction?.product?.image?.imageURL}
                      />

                      <div className="col-lg-12 warning-text mt-5">
                      Souhaitez-vous l'achetez au prix réduit de{" "}
                        {Math.round(auction?.product?.prix * 0.7)} DT?
                        {/*<hr className="p-0 m-0 d-none d-lg-block">
                                            <p className="tag-section d-none d-lg-block"><strong> <i className="fas fa-user"></i>  Nombre de participants <span className="floating">---</span> </strong></p>*/}
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex flex-row w-100">
              <button
                className="btn btn-outline-checkout my-1 flex-1 "
                style={{ textDecoration: "none" }}
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(
                    createOrder({
                      user_id: userInfo?._id,
                      room_id: auction?._id,
                      name: auction?.product?.title,
                      nom : userInfo?.lastName,
                      prenom: userInfo?.firstName ,
                      date: new Date(),
                      email: userInfo?.email,
                      image: auction?.product?.image?.imageURL,
                      prix: auction?.product?.prix,
                      prixPromo: Math.round(auction?.product?.prix * 0.7),
                      typeWinner: "premium",
                    })
                  )
                    .then((res) => {
                      dispatch(
                        updateRoom({
                          id: auction?._id,
                          data: {
                            directWinner: userInfo?._id,
                            directPrice: Math.round(auction?.product?.prix * 0.7),
                          },
                        })
                      );
                    })
                    .then(()=>  parentCallback(auction?._id, userInfo?._id))
                    .then((res) => {
                      navigate(`/checkout/${auction?._id}`);

                    });
                
                }}
              >
               Oui {/* <FontAwesomeIcon icon={faArrowRight} /> */}
              </button>
        
              <button
                className="btn btn-outline-cancel my-1 flex-1  "
                
                onClick={(e)=>{  
                  e.preventDefault()
                  setShow(false);
                  props.hidCallback(show)}}
              >
               Non {/* <FontAwesomeIcon icon={faArrowRight} /> */}
              </button>
            </Modal.Footer>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default DirectPurchaseModal;
