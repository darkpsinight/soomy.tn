import React, { useState } from 'react';
import copper from "../../../assets/images/bronze.png";
import CIcon from "@coreui/icons-react";
import { useLocation } from "react-router-dom";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import {
  fetchRoomList,
  deleteRoom,
  editRoom,
  updateRoom,
  clearRoomErrors,
  createRoom,
  fetchRoomListPagination,
  clearRoomState,
} from "../../../redux/roomSlice";
import {setRoomToggle} from "../../../redux/modalSlice";

const creation = () => {
    const dispatch = useDispatch();
  const [participationShow, setParticipationShow] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [RoomInput, setRoomInput] = useState({});
  const [RoomInputEdit, setRoomInputEdit] = useState({});
  const [SearchTerm, setSearchTerm] = useState("");
  const [auctionSearch, setAuctionSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selection, setSelection] = useState(false);
  const [rentable, setRentable] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showSearch, setShowSearch] = useState();
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [searchBy, setSearchBy] = useState("name");
  const {roomToggle}= useSelector((state) => state.modal);
  const {
    createdRoom,
    loadingCreateRoom,
    createRoomErrors,
    editedRoom,
    loadingUpdateRoom,
    updateRoomErrors,
    roomEditSuccess,
    auctions,
  } = useSelector((state) => state.room);
  const { products } = useSelector((state) => state.product);
  const handleSubmit = () => {
    dispatch(clearRoomErrors());
    dispatch(createRoom(RoomInput)).then(() =>
      dispatch(fetchRoomListPagination({ page: auctions?.page }))
    );
  };
  const clickout = () => {
    setTimeout(() => {
      setShow(false);
    }, 200);
  };
  const clearState = () => {
    setModalShow(false);
    setRoomInput({
      product: "",
      startDate: "",
      nbParticipant: "",
      capacity: "",
      mise: "",
      participationPrice: "",
      roomCategory: "",
      niveau: "",
    });
    setSearchTerm("");
    dispatch(clearRoomErrors());
    setRentable(false);
    setSelection(false);
  };
  const handleChange = (e) => {
    setRoomInput({ ...RoomInput, [e.target.name]: e.target.value });
  };
  const handleChangeProduct = (elm) => {
    setRoomInput({
      ...RoomInput,
      product: elm._id,
    });
    setSearchTerm(elm.title);
  };
    return (
        <div>
             <Modal show={roomToggle} onHide={()=>dispatch(setRoomToggle(false))}>
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Créer Enchère
          </h5>
        </Modal.Header>
        <Modal.Body className="m-3">
          <div className="mb-1 d-flex flex-column justify-content-start position-relative">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              {" "}
              Produit{" "}
            </label>
            <input
              type="text"
              className="form-control"
              onFocus={() => setShow(true)}
              onBlur={clickout}
              id="exampleFormControlInput1"
              placeholder="Produit"
              name="product"
              autocomplete="off"
              value={SearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {show && (
              <div className="search-card">
                <ul>
                  {products
                    ? products?.productList
                        ?.filter((elm) =>
                          elm.title
                            .toLowerCase()
                            .match(SearchTerm?.toLowerCase().trim())
                        )
                        .map((elm) => (
                          <li onClick={() => handleChangeProduct(elm)}>
                            {elm.title}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            )}
          </div>
          <div className="mb-3 d-flex">
            <div className="d-flex flex-column justify-content-left w-50 pe-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Type{" "}
              </label>
              <select
                className="form-control me-1"
                id="exampleFormControlInput1"
                name="niveau"
                value={RoomInput.niveau}
                onChange={(e) => handleChange(e)}
              >
                <option>Choisir un Type</option>
                <option value="copper">copper</option>
                <option value="silver">silver</option>
                <option value="gold">gold</option>
              </select>
            </div>
            <div className="d-flex flex-column justify-content-left w-50 ps-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start ps-2"
              >
                Categorie enchère
              </label>
              <select
                className="form-control "
                id="exampleFormControlInput1"
                name="roomCategory"
                value={RoomInput.roomCategory}
                onChange={(e) => handleChange(e)}
              >
                <option>Choisir une Room</option>
                <option value="soomy">Soomy</option>
                <option value="particulier">Particulier</option>
                <option value="premium">Premium</option>
                <option value="influencer">Influenceur</option>
              </select>
            </div>
          </div>

          <div className="d-flex mb-3">
            <div className="d-flex flex-column justify-content-left w-50 pe-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Prix de Participation{" "}
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Prix de Participation"
                name="participationPrice"
                value={RoomInput.participationPrice}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="d-flex flex-column justify-content-left w-50 ps-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Date Début{" "}
              </label>
              <input
                type="datetime-local"
                className="form-control "
                id="exampleFormControlInput1"
                placeholder="Date de Début"
                name="startDate"
                value={RoomInput.startDate}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="d-flex mb-3">
            <div className="d-flex flex-column justify-content-left w-50 pe-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Capacité{" "}
              </label>
              <input
                type="number"
                className="form-control "
                id="exampleFormControlInput1"
                placeholder="capacité"
                name="capacity"
                value={RoomInput.capacity}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="d-flex flex-column justify-content-left w-50 ps-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start ps-2"
              >
                Mise
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Mise"
                name="mise"
                value={RoomInput.mise}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          {loadingCreateRoom && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {createRoomErrors && (
            <div className="alert alert-danger" role="alert">
              {createRoomErrors}
            </div>
          )}
          {createdRoom && (
            <div className="alert alert-success" role="alert">
              Enchère créé avec succés !
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearState}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save changes
          </button>
        </Modal.Footer>
      </Modal>
        </div>
    );
};

export default creation;