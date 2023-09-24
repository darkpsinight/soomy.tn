import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer/Footer";
import { Link ,useParams,useNavigate} from "react-router-dom";
import CIcon from '@coreui/icons-react'
import axios from "axios";
import {
cilCheckCircle
} from '@coreui/icons'
import Alert from "@mui/material/Alert";
import {useSelector} from "react-redux";
const Reset = () => {
  const params = useParams()
  const step = params.step
  const email = params.email
  const [userInput, setUserInput] = useState(email);
  const [validation, setValidation] = useState({});
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [toggle, setToggle] = useState(false);

  const [error , setError] = useState(null)
  const [errorVerif , setErrorVerif] = useState(null)
  const [errorPassword , setErrorPassword] = useState(null)
const {userInfo} = useSelector(state=>state.user)
const navigate = useNavigate()
useEffect(()=>{
if(userInfo){
  navigate('/')
}
},[])
  const getUserInfo = (e) => {
    setUserInput(e.target.value);
  };
  function sendData(e) {
    e.preventDefault(e);
    axios
      .get(`/users/getemail/${userInput}`)
      .then((res) => {
    setToggle(true)
      }).catch((err)=>{
        setError(err?.response?.data?.msg)});
  }
 

  return (
    <div>
      
      <main className="d-flex flex-column justify-content-center align-items-center register pt-lg-5">
        <div className="container p-4 edge-shadow-connect  d-flex justify-content-center align-items-center flex-column">
        <form
            className={`row g-3 mt-4 mx-lg-5 mx-auto px-2`}
            onSubmit={(e) => sendData(e)}
          >
            <div className="d-flex flex-column flex-lg-row col-md-12 justify-content-between d-sm-column my-0">
              <div className="register-input w-100 my-1">
                <label for="validationServerUsername" className="form-label">
                  Email
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="validationServerUsername"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    onChange={(e) => getUserInfo(e)}
                    required
                  />
                  <div
                    id="validationServerEmailFeedback"
                    className="invalid-feedback"
                  >
                    Please choose an email.
                  </div>
                </div>
            {error? <Alert className="mt-2" severity="error">
            {error}
          </Alert>:toggle? <Alert className="mt-2" severity="success">
          E-mail de réinitialisation envoyé . Veuillez vérifier votre e-mail .
          </Alert>:null}
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center">
              <button className="btn btn-register my-3" type="submit">
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reset;