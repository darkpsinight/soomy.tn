import React, { useState , useEffect } from "react";
import { updatePassword, updateUser } from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import { clearUpdate ,setCloseModal} from "../../../redux/userSlice";
import {useNavigate,Link} from "react-router-dom"
const User = () => {
    const user = useSelector((state) => state.user);
    const { userInfo, isAuth ,  updateErrors,
      updateLoading,updateShow } = user;
      const navigate = useNavigate()
    const [updatedInfo, setUpdatedInfo] = useState(userInfo);
    const [newPassword, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [test , setTest] = useState(false)
    const dispatch = useDispatch();
    const handleUpdateChange = (e) => {
        setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
        if(JSON.stringify(updatedInfo)!==JSON.stringify(userInfo)){
          setTest(true)
        }
      };
      const handleUpdateSubmit = (e) => {
        e.preventDefault();
        dispatch(clearUpdate())
        if (test) {
          dispatch(updateUser({ id: userInfo._id, data: updatedInfo }));
        }
        if (newPassword) {
  
            dispatch(
              updatePassword({
                id: userInfo._id,
                data: { oldPassword: oldPassword, newPassword: newPassword,confirmPassword:confirmPassword },
              })
            );
          
        }
        setPassword("");
        setConfirmPassword("");
        setOldPassword("");
        setTest(false)

      };
      useEffect(()=>{
        dispatch(setCloseModal())
        return (()=>{
          dispatch(clearUpdate())
        })
      },[dispatch])
      
    return (
        <div className="px-3 py-2">
        <h2 className="mx-auto">Infos Compte</h2>
        <form className="profile-form" onSubmit={(e) => handleUpdateSubmit(e)}>
          <div className="form-group  mt-2">
            <label for="formGroupExampleInput1">
              Nom
            </label>
            <input
              value={updatedInfo.firstName}
              type="text"
              className="form-control"
              id="formGroupExampleInput1"
              onChange={(e) => handleUpdateChange(e)}
              name="firstName"
            />
          </div>
          <div className="form-group  mt-2">
            <label for="formGroupExampleInput2">
              Prénom
            </label>
            <input
              value={updatedInfo.lastName}
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              onChange={(e) => handleUpdateChange(e)}
              name="lastName"
            />
          </div>
          <div className="form-group  mt-2">
            <label for="formGroupExampleInput3">
              Nom d'utilisateur
            </label>
            <input
              value={updatedInfo.username}
              type="text"
              className="form-control"
              id="formGroupExampleInput3"
              onChange={(e) => handleUpdateChange(e)}
              name="username"
              disabled
            />
          </div>
          <div className="form-group mt-2">
            <label for="formGroupExampleInput4">Adresse </label>
            <input
              value={updatedInfo.adresse}
              type="text"
              className="form-control"
              id="formGroupExampleInput4"
              onChange={(e) => handleUpdateChange(e)}
              name="adresse"
            />
          </div>
          <div className="form-group mt-2">
            <label for="formGroupExampleInput5">E-mail</label>
            <input
              value={updatedInfo.email}
              type="text"
              className="form-control"
              id="formGroupExampleInput5"
              onChange={(e) => handleUpdateChange(e)}
              name="email"
            />
          </div>

          {userInfo?.facebookId ? (
            <div className="alert alert-primary mt-2" role="alert">
              Vous êtes connectés avec facebook
            </div>
          ) : userInfo?.googleId ? (
            <div className="alert alert-primary mt-2" role="alert">
              Vous êtes connectés avec google
            </div>
          ) : (
            <div>
              {" "}
              <div className="form-group mt-2">
                <label for="formGroupExampleInput6">
                Mot de passe actuel
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="formGroupExampleInput6"
                  onChange={(e) => setOldPassword(e.target.value)}
                  name="oldPassword"
                  value={oldPassword}
                />
              </div>
              <div className="form-group mt-2">
                <label for="formGroupExampleInput7">
                  Nouveau Mot de Passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="formGroupExampleInput7"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label for="formGroupExampleInput8">
                  Confirmer Mot de Passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="formGroupExampleInput8"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirmPassword"
                />
              </div>
              {!userInfo?.approved?  <Alert severity="error" className="w-100 my-5">
          Vous n'avez pas vérifié votre compte. Veuillez compléter la vérification de votre téléphone <Link to={'/phone'}>ici</Link>
        </Alert>:null}
            </div>
          )}
            { updateShow&& (
                    <div className="alert alert-success mt-2" role="alert">
                      utilisateur mis à jour
                    </div>
                  )}
                  {updateErrors && (
                    <div className="alert alert-danger mt-2" role="alert">
                      {updateErrors}
                    </div>
                  )}
                  {updateLoading && (
                    <div className="d-flex justify-content-center align-items-center p-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
                  )}
                
          <div className="button-box">
            <button type="button" className="btn btn-outline-warning">
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-outline-success"
              
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    );
};

export default User;