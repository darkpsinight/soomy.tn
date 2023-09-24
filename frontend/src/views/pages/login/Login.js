import React, { useState } from "react";
import Footer from "../../../components/footer/Footer";
import avatar from "../../../assets/images/avatar.jpg";
import facebook_logo from "../../../assets/images/facebook.png";
import gmail_logo from "../../../assets/images/gmail.png";
import { login, getUser } from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
const Login = () => {
  const [userInput, setUserInput] = useState({});
  const [loading, setLoading] = useState(false);
  const { loginErrors } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const getUserInfo = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  function sendData(e) {
    e.preventDefault(e);
    setLoading(true);
    dispatch(login(userInput))
      .then((res) => {
        if (res.payload.status === 200) {
          return dispatch(getUser()).then((res) => {
            if (res.payload.status === 200) {
              toast.success("Vous etes connectés!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const facebook = () => {
    window.open("https://soomy.tn/users/facebook", "_self");
  };

  const google = () => {
    window.open("https://soomy.tn/users/google", "_self");
  };

  return (
    <div>
      <main className="d-flex flex-column py-2 px-2 px-lg-5 justify-content-center align-items-center connect pt-lg-5">
        <div className="w-100 px-lg-5 py-1 py-lg-4 edge-shadow-connect d-flex justify-content-center align-items-center flex-column mt-2">
          <h1 className="my-2">Connexion</h1>
          <div className="avatar-connection d-flex justify-content-center align-items-center flex-column  mt-2">
            <img src={avatar} className="edge-shadow" />
            <h2>Se connecter</h2>
          </div>
          <form className="row g-3 mt-3" onSubmit={(e) => sendData(e)}>
            <div className="col-md-12 my-3">
              <label for="validationServerUsername" className="form-label">
                Télèphone, E-mail ou Nom d'utilisateur
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="validationServerUsername"
                  aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                  required
                  onChange={(e) => getUserInfo(e)}
                  autoComplete="username"
                />
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  Veuillez saisir un numéro télèphone, E-mail ou Nom
                  d'utilisateur.
                </div>
              </div>
            </div>
            <div className="col-md-12 mb-3 mt-2">
              <label for="validationServer03" className="form-label">
                Mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="validationServer03"
                name="password"
                aria-describedby="validationServer03Feedback"
                required
                onChange={(e) => getUserInfo(e)}
                autoComplete="current-password"
              />
              <div id="validationServer03Feedback" className="invalid-feedback">
                Veuillez saisir un mot de passe.
              </div>
            </div>
            {loginErrors ? <Alert severity="error">{loginErrors}</Alert> : null}
            <div className="col-12 d-flex justify-content-center align-items-center my-4">
              <button
                className="btn btn-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Connexion en cours ...
                  </>
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center mt-2">
              <label className="mb-1">
                Mot de passe oublié ?
                <span className="text-primary">
                  {" "}
                  <Link to="/reset" className="psw_reset">
                    Reinitialiser
                  </Link>
                </span>
              </label>
              <label className="mb-1">
                Vous etes nouveau ici?
                <span className="text-primary">
                  <Link to="/register" className="psw_reset">
                    {" "}
                    Créer un compte
                  </Link>
                </span>
              </label>
            </div>
          </form>
          <hr />
          <p>ou</p>
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center social-buttons w-100">
            <p className="col-md-3 text-end">ou connectez vous avec :</p>{" "}
            <div className=" d-flex flex-column col-md-9 flex-lg-row social-wrap">
              <button onClick={facebook}>
                <img src={facebook_logo}></img>Avec facebook
              </button>
              <button onClick={google}>
                <img className="py-1" src={gmail_logo}></img> Avec gmail
              </button>
            </div>
          </div>
          <div className="my-3 col-md-6 d-flex justify-content-baseline">
            <input type="checkbox" className="me-2 mb-2" />
            <label>
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

export default Login;
