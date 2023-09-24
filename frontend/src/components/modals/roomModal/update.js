import React from 'react';
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import routes from "../../../routes";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateRoom,
  clearRoomErrors,
  fetchRoomListPagination,
  clearRoomState,
} from "../../../redux/roomSlice";
import Creation from "../../../components/modals/roomModal/creation"
import { fetchProductList } from "../../../redux/productSlice";
import ParticipationProgress from "../../../components/ParticipationProgress"
import { setRoomToggleUpdate } from "../../../redux/modalSlice";
const update = () => {
    const dispatch = useDispatch();
    const [RoomInputEdit, setRoomInputEdit] = useState({});
    const [SearchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);
    const [selection, setSelection] = useState(false);
    const [rentable, setRentable] = useState(false);
    const [showSearch, setShowSearch] = useState();
    const [modalShowEdit, setModalShowEdit] = useState(false);
    const room = useSelector((state) => state.room);
    const {roomToggleUpdate}= useSelector((state) => state.modal);
    const {
      editedRoom,
      loadingUpdateRoom,
      updateRoomErrors,
      roomEditSuccess,
      auctions,
    } = room;
    const {
      product,
      startDate,
      nbParticipant,
      capacity,
      mise,
      participationPrice,
      roomCategory,
      niveau,
    } = editedRoom;
  
    const produit = useSelector((state) => state.product);
    const { products } = produit;
    useEffect(() => {
      (async () => dispatch(fetchProductList()))();
    }, [dispatch]);
  
    const clickout = () => {
      setTimeout(() => {
        setShow(false);
      }, 200);
    };
    const handleChangeEdit = (e) => {
      setRoomInputEdit({ ...RoomInputEdit, [e.target.name]: e.target.value });
    };
    const handleChangeEditProduct = (elm) => {
      setRoomInputEdit({
        ...RoomInputEdit,
        product: elm._id,
      });
      setSearchTerm(elm.title);
    };
    const handleSubmitEdit = () => {
      dispatch(clearRoomErrors());
      dispatch(updateRoom({ id: editedRoom._id, data: RoomInputEdit })).then(() =>
        dispatch(fetchRoomListPagination({ page: auctions?.page }))
      );
    };

    const clearStateEdit = () => {
      setModalShowEdit(false);
      setRoomInputEdit({
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
    useEffect(() => {
      setRoomInputEdit({
        product,
        startDate,
        nbParticipant,
        capacity,
        mise,
        participationPrice,
        roomCategory,
        niveau,
      });
      setSearchTerm(product?.title);
    }, [editedRoom]);
  
    useEffect(() => {
      dispatch(fetchRoomListPagination({ page: 1 }));
      dispatch(clearRoomState());
    }, [dispatch]);
    const Room = useSelector((state) => state.room);
    const {
    } = Room;
  
    useEffect(() => {
      (async () =>
        dispatch(fetchRoomListPagination()).then((res) =>
          setShowSearch(false)
        ))();
    }, []);
  
    return (
        <div>
               <Modal show={roomToggleUpdate} onHide={()=>{dispatch(setRoomToggleUpdate(false))}}>
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Modifier Enchère
          </h5>
        </Modal.Header>
        <Modal.Body className="m-3">
          <div className="d-flex flex-column justify-content-left w-100 ">
            <div className="mb-1 d-flex flex-column justify-content-left position-relative">
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
                            <li onClick={() => handleChangeEditProduct(elm)}>
                              {elm.title}
                            </li>
                          ))
                      : null}
                  </ul>
                </div>
              )}
            </div>
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
                value={RoomInputEdit.niveau}
                onChange={(e) => handleChangeEdit(e)}
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
                className="form-control"
                id="exampleFormControlInput1"
                name="roomCategory"
                value={RoomInputEdit.roomCategory}
                onChange={(e) => handleChangeEdit(e)}
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
                Date Début{" "}
              </label>
              <input
                type="datetime-local"
                className="form-control  "
                id="exampleFormControlInput1"
                placeholder={new Date(RoomInputEdit.startDate)}
                name="startDate"
                onChange={(e) => handleChangeEdit(e)}
              />
            </div>
            <div className="d-flex flex-column justify-content-left w-50 ps-1">
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
                value={RoomInputEdit.participationPrice}
                onChange={(e) => handleChangeEdit(e)}
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
                className="form-control me-2"
                id="exampleFormControlInput1"
                placeholder="capacité"
                name="capacity"
                value={RoomInputEdit.capacity}
                onChange={(e) => handleChangeEdit(e)}
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
                value={RoomInputEdit.mise}
                onChange={(e) => handleChangeEdit(e)}
              />
            </div>
          </div>

          {loadingUpdateRoom && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {updateRoomErrors && (
            <div className="alert alert-danger" role="alert">
              {updateRoomErrors}
            </div>
          )}
          {roomEditSuccess && (
            <div className="alert alert-success" role="alert">
              Enchère Mis a jour !
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearStateEdit}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmitEdit}
          >
            Save changes
          </button>
        </Modal.Footer>
      </Modal>
        </div>
    );
};

export default update;