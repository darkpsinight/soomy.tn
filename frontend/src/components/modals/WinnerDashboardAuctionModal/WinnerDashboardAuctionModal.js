import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import BasicTable from "./BasicTable";
import "./styles.css";

function WinnerDashboardAuctionModal({ show, onHide, userId }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchedUserId, setFetchedUserId] = useState(null);

  useEffect(() => {
    if (show && userId && userId !== fetchedUserId) {
      fetchUserDetails(userId);
    }
  }, [show, userId]);

  const fetchUserDetails = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/users/getUserDetailsById/${userId}`);
      setUserDetails(response.data);
      setFetchedUserId(userId);
    } catch (error) {
      console.error("Error fetching user details: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Détails du gagnant
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mt-3">
        {userId ? (
          loading ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CircularProgress />
              </div>
              <p>Chargement des détails de gagnant en cours...</p>
            </>
          ) : userDetails ? (
            <div className="container-body-modal3">
              <div className="image-container">
                <img
                  src={userDetails?.profile_img?.imageURL}
                  alt="img_winner"
                />
              </div>
              <div className="table-container">
                <BasicTable userDetails={userDetails} />
              </div>
            </div>
          ) : (
            <p>Échec de la récupération des détails de l'utilisateur.</p>
          )
        ) : (
          <p>
            <span style={{ fontWeight: "bold", color: "red" }}>
              Compte supprimé
            </span>
            , aucune donnée à afficher pour ce client.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WinnerDashboardAuctionModal;
