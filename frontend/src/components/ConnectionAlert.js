/* import {
  
    faExclamation,
    faExclamationTriangle,
    
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; */
  import React, { useState, useEffect, useCallback } from "react";
  
/*   import trophy from "../assets/trophy.png"; */
  import Modal from "react-bootstrap/Modal";
  import Button from "react-bootstrap/Button";
  import {useNavigate} from "react-router-dom";
 /*  import { createOrder, getNumberOfOrders } from "../redux/orderSlice"; */
  import { useDispatch, useSelector } from "react-redux";
  
  const ConnectionAlert = (props) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
  
 
    /* useEffect(() => {
      dispatch(getNumberOfOrders());
    }, []); */
    const sendMessage = (e) => {
      
      e.preventDefault();
     
        props.socket.emit("priseEnMain", {
          user: props.user?.username,
            room: props.room?._id,
            montant: props.remaining,
            app_id: props.user?._id,
            mise: props?.room?.mise,
            freeCredit : props.freeCredit,
            photo:props.user?.profile_img?.imageURL,
           
        })
        setShow(false);
        props.parentCallback(show);
      
     
    };
    
    return (
      <Modal {...props} centered>
        <div className="modal-dialog modal-dialog-centered m-0" role="document">
          <div className="modal-content">
            <form>
              <Modal.Header>
                {/*<h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>*/}
                <div className="circle-icon">
                  {/* <FontAwesomeIcon icon={faExclamationTriangle} style={{color:"#F5274C"}}/> */}
                 <i className=
"fi fi-rr-exclamation"
style={{color:"white"}}
></i>
                </div>
              </Modal.Header>
              <Modal.Body className="py-0">
                <h3 className="warning-connection">
                Vous êtes déjà connecté!
                </h3>
                <p className="warning-text">
                Vous êtes déja connecté sur un autre appareil, cliquez sur "Prise en main" pour passer le contrôle à cette appareil.
                Si vous souhaitez continuer sur l'ancien appareil, cliquez sur "Sortir".
                </p>
                <br />
                <br />
              </Modal.Body>
              <Modal.Footer style={{flexWrap:"nowrap"}}>
                <button className="btn btn-outline-cancel w-50" onClick={()=>navigate('/')}>Sortir</button>
                <button className="btn btn-outline-checkout w-50" onClick={sendMessage}>Prise en main</button>
              </Modal.Footer>
            </form>
          </div>
        </div>
      </Modal>
    );
  };
  
  export default ConnectionAlert;