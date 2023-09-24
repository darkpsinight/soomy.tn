import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DenseTable from "./DenseTable";

function TenLastMiseModal({ show, onHide, tenLastMisesData }) {
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
          Dix dernières mises
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mt-3">
        <DenseTable tenLastMisesData={tenLastMisesData} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TenLastMiseModal;
