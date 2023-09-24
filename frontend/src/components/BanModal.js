/*
  import React, { useState, useEffect, useCallback } from "react";
  
  import trophy from "../assets/trophy.png";*/
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
// import { createOrder, getNumberOfOrders } from "../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const BanModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Modal {...props} centered>
      <div className="modal-dialog modal-dialog-centered m-0" role="document">
        <div className="modal-content">
          <form>
            <Modal.Header>
              {/*<h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>*/}
              <div className="circle-icon">
                <i
                  className="fi fi-rr-exclamation"
                  style={{ color: "white" }}
                ></i>
                {/* <FontAwesomeIcon icon={faExclamationTriangle} style={{color:"#F5274C"}}/> */}
              </div>
            </Modal.Header>
            <Modal.Body className="py-0">
              <h3 className="warning-connection">
                Vous êtes banni de cette enchère!
              </h3>
              <p className="warning-text">
                Veuillez contacter soomy@contact.com pour plus d'informations,
                cliquez sur "D'accord" pour quitter la page.
              </p>
              <br />
              <br />
            </Modal.Body>
            <Modal.Footer style={{ flexWrap: "nowrap" }}>
              <button
                className="btn btn-outline-cancel w-100"
                onClick={() => navigate("/")}
              >
                D'accord
              </button>
            </Modal.Footer>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BanModal;
