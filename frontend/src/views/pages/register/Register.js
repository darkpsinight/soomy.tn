import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer/Footer";
import facebook_logo from "../../../assets/images/facebook.png";
import gmail_logo from "../../../assets/images/gmail.png";
import { postNewUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Register = () => {
  const [userInput, setUserInput] = useState({});
  const [checked, setCheck] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [registrationInProgress, setRegistrationInProgress] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerErrors, isAuth } = useSelector((state) => state.user);

  const getUserInfo = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  // Function to handle password confirmation change
  const handlePasswordConfirmChange = (e) => {
    const confirmValue = e.target.value;
    setPasswordConfirm(confirmValue);
    // Clear the password confirmation error when the confirmation matches the password
    if (confirmValue === userInput.password) {
      setPasswordMatchError(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, []);

  function sendData(e) {
    e.preventDefault();
    setRegistrationInProgress(true);
    if (userInput.password === passwordConfirm) {
      dispatch(postNewUser(userInput))
        .then((res) => {
          if (res.payload.status === 200) {
            navigate("/phone");
          }
        })
        .finally(() => {
          setRegistrationInProgress(false); // Registration process finished
        });
    } else {
      setPasswordMatchError(true);
      setRegistrationInProgress(false); // Registration process finished (with error)
    }
  }

  const facebook = () => {
    window.open("https://soomy.tn/users/facebook", "_self");
  };

  const google = () => {
    window.open("https://soomy.tn/users/google", "_self");
  };

  return (
    <div>
      <main className="d-flex flex-column justify-content-center align-items-center register pt-lg-5">
        <div className="container p-4 edge-shadow-connect d-flex justify-content-center align-items-center flex-column">
          <h1 className="mt-1">Créez votre compte</h1>
          <div className="d-flex justify-content-between align-items-center flex-column flex-lg-row w-100 mt-4 p-lg-4">
            <h2 className="col-md-4">
              Comment souhaitez-vous créer votre compte?
            </h2>
            <div className="d-flex flex-column col-md-4 me-2 social-buttons">
              <button className="w-100 mb-2" onClick={facebook}>
                <img src={facebook_logo}></img>avec facebook
              </button>
              <button className="w-100 mt-2" onClick={google}>
                <img className="py-1" src={gmail_logo} /> avec gmail
              </button>
            </div>
          </div>
          <hr className="w-50 m-4" />
          <p className="mx-auto">ou</p>
          <form
            className="row g-3 mt-2 mx-lg-5 mx-auto px-2"
            onSubmit={(e) => sendData(e)}
          >
            <div className="d-flex flex-column flex-lg-row col-md-12 justify-content-between d-sm-column my-0">
              <div className="register-input my-2">
                <label for="validationServer01" className="form-label">
                  Prénom
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  id="validationServer01"
                  onChange={(e) => getUserInfo(e)}
                  required
                />
                <div
                  id="validationServerFirstNameFeedback"
                  className="invalid-feedback"
                >
                  Veuillez choisir un prénom .
                </div>
              </div>
              <div className="register-input my-2">
                <label for="validationServer02" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control "
                  name="lastName"
                  id="validationServer02"
                  onChange={(e) => getUserInfo(e)}
                  required
                />
                <div
                  id="validationServerLastNameFeedback"
                  className="invalid-feedback"
                >
                  Veuillez choisir un nom .
                </div>
              </div>
            </div>
            <div className="d-flex flex-column flex-lg-row col-md-12 justify-content-between d-sm-column my-0">
              <div className="register-input my-2">
                <label for="validationServer02" className="form-label">
                  Pseudo
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    name="username"
                    className="form-control "
                    id="validationServer03"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    onChange={(e) => getUserInfo(e)}
                    required
                  />
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    Veuillez choisir un nom d'utilisateur.
                  </div>
                </div>
              </div>
              <div className="register-input my-2">
                <label for="validationServer04" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="validationServer04"
                  aria-describedby="validationServer04Feedback"
                  onChange={(e) => getUserInfo(e)}
                  required
                />
                <div
                  id="validationServerEmailFeedback"
                  className="invalid-feedback"
                >
                  Veuillez choisir une adresse mail valide.
                </div>
              </div>
            </div>
            <div className="d-flex flex-column flex-lg-row-reverse col-md-12 justify-content-between d-sm-column my-0">
              <div className="register-input my-2">
                <label for="validationServer05" className="form-label">
                  Genre
                </label>
                <select
                  name="genre"
                  className="form-control "
                  id="validationServer05"
                  aria-describedby="validationServer05Feedback"
                  required
                  onChange={(e) => getUserInfo(e)}
                >
                  <option>Select...</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                  {/* There's no "Autre" - يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَى */}
                  <option value="other">Autre</option>{" "}
                </select>
              </div>
              <div className="register-input my-2">
                <label for="validationServer06" className="form-label">
                  Mot de passe
                </label>
                <div className="input-group has-validation">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="validationServer06"
                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                    onChange={(e) => getUserInfo(e)}
                    required
                  />
                  <div
                    id="validationServerPasswordFeedback"
                    className="invalid-feedback"
                  >
                    Veuillez choisir un mot de passe.
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column flex-lg-row col-md-12 justify-content-between d-sm-column my-0">
              <div className="register-input my-2">
                <label htmlFor="validationServer07" className="form-label">
                  Confirmer mot de passe
                </label>
                <div className="input-group has-validation">
                  <input
                    type="password"
                    className={`form-control ${
                      passwordMatchError ? "is-invalid" : ""
                    }`}
                    id="validationServer07"
                    aria-describedby="validationServer07Feedback"
                    onChange={handlePasswordConfirmChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center">
              <button
                className="btn btn-register my-3 w-auto"
                type="submit"
                disabled={
                  !checked || passwordMatchError || registrationInProgress
                }
              >
                {registrationInProgress ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Registration en cours ...
                  </>
                ) : (
                  "Suivant"
                )}
              </button>
            </div>
          </form>

          {passwordMatchError ? (
            <Alert severity="error" style={{ marginBottom: "16px" }}>
              Les mots de passe ne correspondent pas.
            </Alert>
          ) : null}

          {registerErrors ? (
            <Alert severity="error">{registerErrors}</Alert>
          ) : null}

          <div className="col-md-5 d-flex align-items-baseline mt-2">
            <input
              type="checkbox"
              className="me-2"
              onChange={(e) => setCheck(e.target.checked)}
            />
            <label className="mb-1">
              En créant un compte, j'accepte les{" "}
              <span className="text-primary">
                condition générales de ventes et les politiques de
                confidentialités
              </span>
            </label>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
