import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import {
  updatePack,
  updatePackImage,
  clearPackErrors,
  fetchPackList,
} from "../../../redux/packSlice";
import { setPackToggleUpdate } from "../../../redux/modalSlice";
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
const update = () => {
  const [showSearch, setShowSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [Packlist, setPacklist] = useState({});
  const [PacklistEdit, setPacklistEdit] = useState({});

  const dispatch = useDispatch();
  const pack = useSelector((state) => state.pack);
  const {
    editedPack,
    updatePackErrors,
    loadingUpdatePack,
    PackeditSuccess,
    PackImageEditSuccess,
    Packs,
  } = pack;
  const { packToggleUpdate } = useSelector((state) => state.modal);
  useEffect(() => {
    dispatch(fetchPackList());
  }, [dispatch]);
  const { credit, prix, num_uses } = editedPack;
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleChangeEdit = (e) => {
    setPacklistEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEdit = () => {
    dispatch(clearPackErrors());
    dispatch(
      updatePack({
        id: editedPack._id,
        data: PacklistEdit,
        page: Packs?.page,
      })
    );
    if (selectedImage) {
      dispatch(
        updatePackImage({
          id: editedPack._id,
          file: selectedImage,
          page: Packs?.page,
        })
      );
    }
  };

  const clearStateEdit = () => {
    setModalShowEdit(false);
    setPacklistEdit({ credit: "", prix: "", num_uses: "" });
    setSelectedImage();
    dispatch(clearPackErrors());
  };
  useEffect(() => {
    setPacklistEdit({ credit, prix, num_uses });
    console.log("editedPack?.image?.imageURL: ", editedPack?.image?.imageURL);
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
        show={packToggleUpdate}
        onHide={() => {
          dispatch(setPackToggleUpdate(false));
        }}
      >
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Update Pack
          </h5>
        </Modal.Header>
        <Modal.Body className="m-3">
          <div style={styles.container}>
            {!selectedImage && (
              <div
                className="upload_image_edit mt-4 mb-4 mx-auto"
                style={{
                  backgroundImage: `url(${editedPack?.image?.imageURL.replace(
                    /\\/g,
                    "/"
                  )})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              >
                <input
                  accept="image/*"
                  type="file"
                  className="photo-input"
                  onChange={imageChange}
                />
                <span>Upload Image</span>
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
                  {/*  <FontAwesomeIcon icon={faTrashAlt} /> */}
                </button>
              </div>
            )}
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label for="credit" className="modal-label text-start">
              Crédit{" "}
            </label>
            <input
              className="form-control"
              type="number"
              id="credit"
              placeholder="Crédit de pack en Bitso"
              name="credit"
              value={PacklistEdit.credit}
              onChange={(e) => handleChangeEdit(e)}
              required
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label for="prix" className="modal-label text-start">
              {" "}
              Prix{" "}
            </label>
            <input
              className="form-control"
              type="number"
              placeholder="prix de la pack"
              id="prix"
              name="prix"
              value={PacklistEdit.prix}
              onChange={(e) => handleChangeEdit(e)}
              required
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label for="uses" className="modal-label text-start">
              Nombre d'utilisation{" "}
            </label>
            <input
              type="number"
              className="form-control"
              id="uses"
              placeholder="Valable pour x enchères"
              name="num_uses"
              value={PacklistEdit.num_uses}
              onChange={(e) => handleChangeEdit(e)}
              required
            />
          </div>

          {loadingUpdatePack && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {updatePackErrors && (
            <div className="alert alert-danger" role="alert">
              {updatePackErrors}
            </div>
          )}
          {(PackeditSuccess || PackImageEditSuccess) && (
            <div className="alert alert-success" role="alert">
              Packs Mis a Jour!
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch(setPackToggleUpdate(false))}
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
