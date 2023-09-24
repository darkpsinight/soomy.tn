import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer/Footer";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { cilCheckCircle } from "@coreui/icons";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../redux/userSlice";
const Register = () => {
  const [userInput, setUserInput] = useState({});
  const [validation, setValidation] = useState({});
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [error, setError] = useState(null);
  const [errorVerif, setErrorVerif] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUserInfo = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  function sendData(e) {
    e.preventDefault(e);
    axios
      .post("/users/sendMessage", userInput, {
        withCredentials: true,
      })
      .then((res) => {
        setToggle(false);
        setToggle2(true);
        setToggle3(false);
      })
      .catch((err) => {
        setError(err?.response?.data?.msg);
      });
  }
  function sendCode(e) {
    e.preventDefault(e);

    axios
      .post("/users/validate", validation, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(getUser());
        setToggle(false);
        setToggle2(false);
        setToggle3(true);
      })
      .catch((err) => {
        setErrorVerif(err?.response?.data?.msg);
      });
  }

  return (
    <div>
      <main className="d-flex flex-column justify-content-center align-items-center register p-lg-5 ">
        <div className="container p-4 edge-shadow-connect  d-flex justify-content-center align-items-center flex-column">
          <form
            className={`row g-3 mt-4 mx-lg-5 mx-auto px-2 ${
              !toggle && "d-none"
            }`}
            onSubmit={(e) => sendData(e)}
          >
            <div className="d-flex flex-column flex-lg-row col-md-12 justify-content-between d-sm-column my-0">
              <div className="register-input w-100 my-1">
                <label for="validationServerUsername" className="form-label">
                  Numéro de Téléphone
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="validationServerUsername"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    onChange={(e) => getUserInfo(e)}
                    required
                  />
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    Please choose a username.
                  </div>
                </div>

                {error ? (
                  <Alert className="mt-2" severity="error">
                    {error}
                  </Alert>
                ) : null}
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center">
              <button className="btn btn-register my-3" type="submit">
                Recevoir code
              </button>
            </div>
          </form>
          <form
            className={`row g-3 mt-4 mx-lg-5 mx-auto px-2 ${
              !toggle2 && "d-none"
            }`}
            onSubmit={(e) => sendCode(e)}
          >
            <div className="d-flex flex-column flex-lg-row col-md-12 justify-content-between d-sm-column my-0">
              <div className="register-input w-100 my-1">
                <label for="validationServerUsername" className="form-label">
                  Veuillez saisir le code de vérification
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    className="form-control"
                    name="validation"
                    id="validationServerUsername"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    onChange={(e) =>
                      setValidation({ validation: e.target.value })
                    }
                    required
                  />
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    Please choose a username.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center">
              <button
                className="btn btn-register mx-1 my-3"
                onClick={() => {
                  setToggle(true);
                  setToggle2(false);
                  setToggle3(false);
                }}
              >
                Retour
              </button>
              <button className="btn btn-register mx-1 my-3" type="submit">
                Envoyer
              </button>
            </div>
            {errorVerif ? (
              <Alert className="mt-2" severity="error">
                {errorVerif}
              </Alert>
            ) : null}
          </form>
          <div
            className={`row g-3 my-4 mx-lg-5 mx-auto px-2 succes-validation ${
              !toggle3 && "d-none"
            }`}
          >
            <div className="text-center my-3 d-flex flex-column justify-content-center align-items-center">
              <CIcon
                icon={cilCheckCircle}
                fontSize={50}
                height={70}
                width={70}
              />{" "}
              <p className="mt-4">Votre compte a été verifié avec succès</p>
            </div>
            <Link to={"/"} className="mx-auto w-50">
              <button className="btn btn-register mx-auto w-100">
                aller à la page d'accueil
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
