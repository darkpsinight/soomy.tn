import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer/Footer";
import { Link ,useLocation,useNavigate} from "react-router-dom";
import CIcon from '@coreui/icons-react'
import axios from "axios";
import {
cilCheckCircle
} from '@coreui/icons'
import Alert from "@mui/material/Alert";
import {useSelector} from "react-redux";
const Reset = () => {

  const { search } = useLocation();
  const redirectInUrlId = new URLSearchParams(search).get('id');
  const redirectInUrlToken = new URLSearchParams(search).get('token');
const id = redirectInUrlId ? redirectInUrlId : '';
const token = redirectInUrlToken ? redirectInUrlToken : '';

  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(false);


  const [errorVerif , setErrorVerif] = useState(null)
  const [errorPassword , setErrorPassword] = useState(null)
const {userInfo} = useSelector(state=>state.user)
const navigate = useNavigate()

useEffect(()=>{
  if(userInfo){
    navigate('/')
  }
  },[userInfo])
  
 useEffect(()=>{  
    axios
      .get(`/users/validateemail/${token}/${id}`)
      .then(() => {


      }).catch((err)=>{
        setErrorVerif(err?.response?.data?.msg)});
  },[])
  function sendPassword(e) {
    e.preventDefault(e);
    
   if(newPassword===confirmPassword){ 
    axios
      .get(`/users/updatePasswordReset/${newPassword}/${id}`)
      .then(() => {
        setToggle(false);
        setToggle2(true);
 
      }).catch((err)=>{
        setErrorPassword(err?.response?.data?.msg)});}
        else setErrorPassword("passwords don't match")
  }
 

  return (
    <div>
      
      <main className="d-flex flex-column justify-content-center align-items-center register pt-lg-5">
        <div className="container p-4 edge-shadow-connect  d-flex justify-content-center align-items-center flex-column">
         
          <form
            className={`row g-3 mt-4 mx-lg-5 mx-auto px-0 ${!toggle && "d-none"}`}
            onSubmit={(e) => sendPassword(e)}
          >
            <div className="d-flex flex-column flex-lg-row col-md-12 justify-content-between d-sm-column my-0">
              <div className="register-input w-100 my-1">
                <label for="validationServerPassword" className="form-label">
                Saisissez Nouveau Mot de passe
                </label>
                <div className="input-group has-validation">
                  <input
                    type="password"
                    className="form-control mb-1"
                    name="NewPassword"
                    id="validationServerPassword"
                    aria-describedby="inputGroupPrepend3 validationServerPasswordFeedback"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                 
                </div>
                <label for="validationServerPassword" className="form-label mt-1">
                Confirmer Mot de passe
                </label>
                <div className="input-group has-validation">
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    id="validationServerUsername"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                 
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center">
            
              <button className="btn btn-register mx-1 my-3" type="submit">
                Envoyer
              </button>
            </div>
            {errorPassword? <Alert className="mt-2" severity="error">
            {errorPassword}
          </Alert>:null}
          </form>
          <div
            className={`row g-3 my-4 mx-lg-5 mx-auto px-2 succes-validation ${!toggle2 && "d-none"}`}
          >
            <div className="text-center my-3 d-flex flex-column justify-content-center align-items-center"><CIcon icon={cilCheckCircle} fontSize={50} height={70} width={70}/>  <p className="mt-4">Votre Mot de passe a été Changé avec succès</p></div>
            <Link to={'/signin'} className="mx-auto w-50"><button className="btn btn-register mx-auto w-100">Connecter</button></Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reset;