import { useState, useEffect } from "react";
import {
  CTableHead,
  CTableBody,
  CTable,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CProgress,
  CAvatar,
  CBadge,
  CFormSelect,
  CBreadcrumbItem,
  CBreadcrumb,
  CContainer,
  CHeader,
} from "@coreui/react";
import {
  cilPenAlt,
  cilTrash,
  cilStar,
  cilGamepad,
  cilSearch,
} from "@coreui/icons";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import axios from "axios";
import gold from "../../../assets/images/gold.png";
import silver from "../../../assets/images/silver.png";
import copper from "../../../assets/images/bronze.png";
import CIcon from "@coreui/icons-react";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";

import {
  createPartner,
  updatePartner,
  updatePartnerImage,
  clearpartnerErrors,
  fetchPartnerList,
  editpartner,
  deletePartner,
} from "../../../redux/partnerSlice";
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
const Partners = () => {
  const [partnerSearch, setPartnerSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [partnerlist, setPartnerlist] = useState({});
  const [partnerlistEdit, setPartnerlistEdit] = useState({});
  const [showSearch, setShowSearch] = useState();
  const dispatch = useDispatch();
  const partner = useSelector((state) => state.partner);

  const {
    createPartnerErrors,
    createdPartner,
    loadingCreatePartner,
    editedpartner,
    loadingUpdatePartner,
    updatePartnerErrors,
    partnereditSuccess,
    partnerImageEditSuccess,
    partners,
    partnerList,
    partnerTotalList,
    loadingPartnerList,
    PartnerListErrors,
  } = partner;
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const { name, adresse, phone, email, image } = editedpartner;
  useEffect(() => {
    setPartnerlistEdit({ name, email, phone, adresse, image });
  }, [editedpartner]);

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  const handleChange = (e) => {
    setPartnerlist({ ...partnerlist, [e.target.name]: e.target.value });
  };
  const handleChangeEdit = (e) => {
    setPartnerlistEdit({ ...partnerlistEdit, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(clearpartnerErrors());
    dispatch(
      createPartner({ partnerlist, file: selectedImage, page: partners?.page })
    );
  };
  const handleSubmitEdit = () => {
    dispatch(clearpartnerErrors());
    dispatch(
      updatePartner({
        id: editedpartner._id,
        data: partnerlistEdit,
        page: partners?.page,
      })
    );
    if (selectedImage) {
      dispatch(
        updatePartnerImage({
          id: editedpartner._id,
          file: selectedImage,
          page: partners?.page,
        })
      );
    }
  };
  const clearState = () => {
    setModalShow(false);
    setSelectedImage();
  };
  const clearStateEdit = () => {
    setModalShowEdit(false);
    setSelectedImage();
  };

  useEffect(() => {
    dispatch(fetchPartnerList());
  }, [dispatch]);
  const currentLocation = useLocation().pathname;
  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };
  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split("/").reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  useEffect(() => {
    dispatch(fetchPartnerList()).then((res) => setShowSearch(false));
  }, []);

  return (
    <>
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CBreadcrumb className="m-0 ms-2">
            <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
            {breadcrumbs.map((breadcrumb, index) => {
              return (
                <CBreadcrumbItem
                  {...(breadcrumb.active
                    ? { active: true }
                    : { href: breadcrumb.pathname })}
                  key={index}
                >
                  {breadcrumb.name}
                </CBreadcrumbItem>
              );
            })}
          </CBreadcrumb>
          <div className="d-flex">
            <div className="dashboard-search mx-1">
              <CIcon icon={cilSearch} className="mx-2" />
              <input
                placeholder="Search"
                value={partnerSearch}
                onChange={(e) => setPartnerSearch(e.target.value)}
                onFocus={() => {
                  dispatch(getTotalPartners()).then((res) =>
                    setShowSearch(true)
                  );
                }}
              />
            </div>
            <button
              className="d-flex align-items-center text-gray text-center justify-content-center mt-3 mt-md-0 plus-button"
              onClick={() => setModalShow(true)}
            >
              <Plus /> Ajouter un partenaire
            </button>
          </div>
        </CContainer>
      </CHeader>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilGamepad} />
            </CTableHeaderCell>
            <CTableHeaderCell>Nom</CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Télephone
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
            <CTableHeaderCell>Date Création</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {partners?.partners
            ?.filter((elm) =>
              elm?.name?.toLowerCase()?.includes(partnerSearch.toLowerCase())
            )
            .map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={item?.image?.imageURL} />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item?.name}</div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  {item?.phone}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item?.email}
                </CTableDataCell>
                <CTableDataCell>
                  <div>
                    {format(
                      new Date(item?.createdAt ? item?.createdAt : null),
                      "Pp"
                    )}
                  </div>
                </CTableDataCell>
                <CTableDataCell>
                  <CIcon
                    className="mx-2"
                    onClick={() => {
                      {
                        dispatch(editpartner(item));
                        setModalShowEdit(true);
                      }
                    }}
                    icon={cilPenAlt}
                  />
                  <CIcon
                    className="mx-2"
                    icon={cilTrash}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        dispatch(
                          deletePartner({ id: item._id, page: partners.page })
                        );
                    }}
                  />
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      {!showSearch ? (
         <Pagination>
         <Pagination.First
           onClick={() => {
             dispatch(fetchRoomListPagination({  page: 1 }));
           }}
         />
 
         <Pagination.Prev
           onClick={() => {
             dispatch(
             fetchPartnerList({
                 
                 page:
                   partners?.page === 1
                     ? partners?.totalPages
                     : partners?.page - 1,
               })
             );
           }}
         />
         <Pagination.Item
           onClick={() => {
             dispatch(fetchRoomListPagination({  page: 1 }));
           }}
           active={partners?.page === 1 ? true : false}
         >
           {1}
         </Pagination.Item>
         {partners?.totalPages > 5 &&
           partners?.page > 3 && <Pagination.Ellipsis />}
         {partners?.totalPages === 3 && (
           <Pagination.Item
             onClick={() => {
               dispatch(fetchRoomListPagination({  page: 2 }));
             }}
             active={partners?.page === 2 ? true : false}
           >
             {2}
           </Pagination.Item>
         )}
         {partners?.totalPages > 4 &&
           [...Array(3).keys()]
             .map(
               (i) =>
                 i +
                 (partners?.page ===
                 partners?.totalPages - 2
                   ? partners?.page - 2
                   : partners?.page ===
                     partners?.totalPages - 1
                   ? partners?.page - 3
                   : partners?.page ===
                     partners?.totalPages
                   ? partners?.page - 4
                   : partners?.page === 1
                   ? partners?.page
                   : partners?.page === 2 ||
                     partners?.page === 3
                   ? 1
                   : partners?.page - 2)
             )
             .map((elm) => (
               <Pagination.Item
                 onClick={() => {
                   dispatch(
                   fetchPartnerList({  page: elm + 1 })
                   );
                 }}
                 active={partners?.page === elm + 1 ? true : false}
               >
                 {elm + 1}
               </Pagination.Item>
             ))}
         {partners?.totalPages === 4 &&
           [...Array(2).keys()]
             .map(
               (i) =>
                 i + 1
                
             )
             .map((elm) => (
               <Pagination.Item
                 onClick={() => {
                   dispatch(
                   fetchPartnerList({  page: elm + 1 })
                   );
                 }}
                 active={partners?.page === elm + 1 ? true : false}
               >
                 {elm + 1}
               </Pagination.Item>
             ))}
         {partners?.totalPages > 5 &&
           partners?.totalPages - 2 > partners?.page && (
             <Pagination.Ellipsis />
           )}
         {
           (partners?.totalPages > 1 && (
             <Pagination.Item
               onClick={() => {
                 dispatch(
                 fetchPartnerList({
                     
                     page: partners?.totalPages,
                   })
                 );
               }}
               active={
                 partners?.totalPages === partners?.page
                   ? true
                   : false
               }
             >
               {partners?.totalPages}
             </Pagination.Item>
           ))}
         <Pagination.Next
           onClick={() => {
             dispatch(
             fetchPartnerList({
                 
                 page:
                   partners.page === partners?.totalPages
                     ? 1
                     : partners?.page + 1,
               })
             );
           }}
         />
         <Pagination.Last
           onClick={() => {
             dispatch(
             fetchPartnerList({
                
                 page: partners?.totalPages,
               })
             );
           }}
         />
       </Pagination>
        
      ) : null}
      {/****************************************Modal*************************************************************** */}
      <Modal
        show={modalShow}
        onHide={clearState}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Créer Partenaire
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
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Nom{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Nom"
              name="name"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Adresse{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Adresse"
              name="adresse"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Email{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              name="email"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Teléphone{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="teléphone"
              name="phone"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          {loadingCreatePartner && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {createPartnerErrors && (
            <div className="alert alert-danger" role="alert">
              {createPartnerErrors}
            </div>
          )}
          {createdPartner && (
            <div className="alert alert-success" role="alert">
              Partner Créé avec succés !
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={clearState}>
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
      {/****************************************END Modal*************************************************************** */}
      {/****************************************Modal Edit*************************************************************** */}
      <Modal
        show={modalShowEdit}
        onHide={clearStateEdit}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Editer Partenaire
          </h5>
        </Modal.Header>
        <Modal.Body className="m-3">
          <div style={styles.container}>
            {!selectedImage && (
              <div
                className="upload_image_edit mt-4 mb-4 mx-auto"
                style={{
                  backgroundImage: `url(${partnerlistEdit?.image?.imageURL})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              >
                <span>Upload Image</span>
                <input
                  accept="image/*"
                  type="file"
                  className="photo-input"
                  onChange={imageChange}
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
                  {/*    <FontAwesomeIcon icon={faTrashAlt} /> */}
                </button>
              </div>
            )}
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Nom{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Nom"
              name="name"
              value={partnerlistEdit.name}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Adresse{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Adresse"
              name="adresse"
              value={partnerlistEdit.adresse}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Email{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              name="email"
              value={partnerlistEdit.email}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Teléphone{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="teléphone"
              name="phone"
              value={partnerlistEdit.phone}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>

          {loadingUpdatePartner && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {(partnereditSuccess || partnerImageEditSuccess) && (
            <div className="alert alert-success" role="alert">
              Partner Mis a jour !
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={clearStateEdit}>
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
      {/****************************************END Modal Edit*************************************************************** */}
    </>
  );
};
export default Partners;
