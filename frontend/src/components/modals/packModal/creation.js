import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { setPackToggle } from "../../../redux/modalSlice";
import {
  createPack,
  clearPackErrors,
  fetchPackList,
} from "../../../redux/packSlice";
import routes from "../../../routes";
const styles = {
  container: {
    display: "flex",
    maxWidth: "19rem",
    maxHeight: "190px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px auto",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
  },
  preview: {
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "19rem", maxHeight: "150px" },
  delete: {
    cursor: "pointer",
    border: "1px gray solid",
    height: "40px",
    width: "100%",
  },
};
const creation = () => {
  const [showSearch, setShowSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [Packlist, setPacklist] = useState({});
  const [PacklistEdit, setPacklistEdit] = useState({});
  const dispatch = useDispatch();
  const pack = useSelector((state) => state.pack);
  const {
    createPackErrors,
    createdPack,
    editedPack,
    loadingCreatePack,
    Packs,
  } = pack;
  const { packToggle } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchPackList());
  }, [dispatch]);
  const { name, description, logo } = editedPack;
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  const handleChange = (e) => {
    setPacklist({ ...Packlist, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(clearPackErrors());
    dispatch(createPack({ Packlist, file: selectedImage}));
  };

  const clearState = () => {
    setPacklist({ description: "", name: "" });
    setSelectedImage();
    dispatch(clearPackErrors());
  };

  useEffect(() => {
    setPacklistEdit({ name, description, logo });
  }, [editedPack]);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchPackList()).then((res) => {
      setLoader(false);
      setShowSearch(false);
    });
  }, []);
  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };
 

  return (
    <div>
      <Modal
        show={packToggle}
        onHide={() => dispatch(setPackToggle(false))}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Créer Packs
          </h5>
        </Modal.Header>

        <Modal.Body className="m-3">
          <div style={styles.container}>
            {!selectedImage && (
              <div className="upload_image mt-4 mb-4 mx-auto">
                <span>Upload Image</span>
                <input
                  accept="image/*"
                  type="file"
                  className="photo-input"
                  onChange={imageChange}
                  required
                />
              </div>
            )}
            {selectedImage && (
              <div style={styles.preview}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  style={styles.image}
                  alt="Thumb"
                />

                <button onClick={removeSelectedImage} style={styles.delete}>
                  {/*   <FontAwesomeIcon icon={faTrashAlt} /> */}
                </button>
              </div>
            )}
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="credit"
              className="modal-label text-start"
            >
              Crédit{" "}
            </label>
            <input
              type="number"
              className="form-control"
              id="credit"
              placeholder="Crédit de pack en Bitso"
              name="credit"
              value={Packlist.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="prix"
              className="modal-label text-start"
            >
              {" "}
              Prix{" "}
            </label>
            <input
              className="form-control"
              type="number"
              placeholder="prix de la pack"
              id="prix"
              value={Packlist.description}
              name="prix"
              onChange={(e) => handleChange(e)}
              required
           />
          </div>


          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="uses"
              className="modal-label text-start"
            >
              Nombre d'utilisation{" "}
            </label>
            <input
              type="number"
              className="form-control"
              id="uses"
              placeholder="Valable pour x enchères"
              name="num_uses"
              value={Packlist.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          {loadingCreatePack && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {createPackErrors && (
            <div className="alert alert-danger" role="alert">
              {createPackErrors}
            </div>
          )}
          {createdPack && (
            <div className="alert alert-success" role="alert">
              Pack Créé !
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
        <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch(setPackToggle(false))}
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
