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
              <>
                <h3 className="warning-connection">
                  Votre Crédit Bonus est épuisé!
                </h3>
              </>
            </Modal.Body>
            <Modal.Footer style={{ flexWrap: "nowrap" }}>
              <button
                className="btn btn-outline-cancel w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setShow(false);
                  props.freeCreditCallback(show);
                }}
              >
                OK
              </button>
            </Modal.Footer>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default WinnerModal;
