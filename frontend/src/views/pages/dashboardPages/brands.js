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
  cilSearch,
  cilGamepad,
  cilWallet,
} from "@coreui/icons";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import CIcon from "@coreui/icons-react";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import {
  createBrand,
  editbrand,
  deleteBrand,
  updateBrand,
  updateBrandImage,
  clearbrandErrors,
  fetchBrandList,
  getTotalBrands,
} from "../../../redux/brandSlice";
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
const Brands = () => {
  const [brandSearch, setBrandSearch] = useState("");
  const [showSearch, setShowSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [brandlist, setBrandlist] = useState({});
  const [brandlistEdit, setBrandlistEdit] = useState({});
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.brand);
  const currentLocation = useLocation().pathname;
  const {
    createBrandErrors,
    createdBrand,
    editedbrand,
    loadingCreateBrand,
    updateBrandErrors,
    loadingUpdateBrand,
    brandeditSuccess,
    brandImageEditSuccess,
    brands,
    brandTotalList,
    loadingBrandList,
    brandListErrors,
  } = brand;

  useEffect(() => {
    dispatch(fetchBrandList());
  }, [dispatch]);
  const { name, description, logo } = editedbrand;
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
    setBrandlist({ ...brandlist, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(clearbrandErrors());
    dispatch(
      createBrand({ brandlist, file: selectedImage, page: brands?.page })
    );
  };
  const handleChangeEdit = (e) => {
    setBrandlistEdit({ ...brandlist, [e.target.name]: e.target.value });
  };
  const handleSubmitEdit = () => {
    dispatch(clearbrandErrors());
    dispatch(
      updateBrand({
        id: editedbrand._id,
        data: brandlistEdit,
        page: brands?.page,
      })
    );
    if (selectedImage) {
      dispatch(
        updateBrandImage({
          id: editedbrand._id,
          file: selectedImage,
          page: brands?.page,
        })
      );
    }
  };
  const clearState = () => {
    setModalShow(false);
    setBrandlist({ description: "", name: "" });
    setSelectedImage();
    dispatch(clearbrandErrors());
  };
  const clearStateEdit = () => {
    setModalShowEdit(false);
    setBrandlistEdit({ description: "", name: "", logo: "" });
    setSelectedImage();
    dispatch(clearbrandErrors());
  };
  useEffect(() => {
    setBrandlistEdit({ name, description, logo });
  }, [editedbrand]);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchBrandList())
      .then((res) => {
        setLoader(false);
        setShowSearch(false);
      })
     
  }, []);
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
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                onFocus={() => {
                  dispatch(getTotalBrands()).then((res) => setShowSearch(true));
                }}
              />
            </div>
            <button
              className="d-flex align-items-center text-gray text-center justify-content-center mt-3 mt-md-0 plus-button"
              onClick={() => setModalShow(true)}
            >
              <Plus /> Ajouter une marques
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
            <CTableHeaderCell>Date Création</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {brands?.brands
            ?.filter((elm) =>
              elm.name.toLowerCase().match(brandSearch?.toLowerCase().trim())
            )
            ?.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={item?.logo?.imageURL} />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item?.name}</div>
                </CTableDataCell>

                <CTableDataCell>
                  <div>{format(new Date(item?.createdAt), "Pp")}</div>
                </CTableDataCell>

                <CTableDataCell>
                  <CIcon
                    className="mx-2"
                    onClick={() => {
                      {
                        dispatch(editbrand(item));
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
                          deleteBrand({ id: item._id, page: brands.page })
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
              fetchBrandList({
                 
                 page:
                   brands?.page === 1
                     ? brands?.totalPages
                     : brands?.page - 1,
               })
             );
           }}
         />
         <Pagination.Item
           onClick={() => {
             dispatch(fetchRoomListPagination({  page: 1 }));
           }}
           active={brands?.page === 1 ? true : false}
         >
           {1}
         </Pagination.Item>
         {brands?.totalPages > 5 &&
           brands?.page > 3 && <Pagination.Ellipsis />}
         {brands?.totalPages === 3 && (
           <Pagination.Item
             onClick={() => {
               dispatch(fetchRoomListPagination({  page: 2 }));
             }}
             active={brands?.page === 2 ? true : false}
           >
             {2}
           </Pagination.Item>
         )}
         {brands?.totalPages > 4 &&
           [...Array(3).keys()]
             .map(
               (i) =>
                 i +
                 (brands?.page ===
                 brands?.totalPages - 2
                   ? brands?.page - 2
                   : brands?.page ===
                     brands?.totalPages - 1
                   ? brands?.page - 3
                   : brands?.page ===
                     brands?.totalPages
                   ? brands?.page - 4
                   : brands?.page === 1
                   ? brands?.page
                   : brands?.page === 2 ||
                     brands?.page === 3
                   ? 1
                   : brands?.page - 2)
             )
             .map((elm) => (
               <Pagination.Item
                 onClick={() => {
                   dispatch(
                    fetchBrandList({  page: elm + 1 })
                   );
                 }}
                 active={brands?.page === elm + 1 ? true : false}
               >
                 {elm + 1}
               </Pagination.Item>
             ))}
         {brands?.totalPages === 4 &&
           [...Array(2).keys()]
             .map(
               (i) =>
                 i + 1
                
             )
             .map((elm) => (
               <Pagination.Item
                 onClick={() => {
                   dispatch(
                    fetchBrandList({  page: elm + 1 })
                   );
                 }}
                 active={brands?.page === elm + 1 ? true : false}
               >
                 {elm + 1}
               </Pagination.Item>
             ))}
         {brands?.totalPages > 5 &&
           brands?.totalPages - 2 > brands?.page && (
             <Pagination.Ellipsis />
           )}
         {
           (brands?.totalPages > 1 && (
             <Pagination.Item
               onClick={() => {
                 dispatch(
                  fetchBrandList({
                     
                     page: brands?.totalPages,
                   })
                 );
               }}
               active={
                 brands?.totalPages === brands?.page
                   ? true
                   : false
               }
             >
               {brands?.totalPages}
             </Pagination.Item>
           ))}
         <Pagination.Next
           onClick={() => {
             dispatch(
              fetchBrandList({
                 
                 page:
                   brands.page === brands?.totalPages
                     ? 1
                     : brands?.page + 1,
               })
             );
           }}
         />
         <Pagination.Last
           onClick={() => {
             dispatch(
              fetchBrandList({
                
                 page: brands?.totalPages,
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
            Créer Marque
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
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Nom de la Marque{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Nom de la Marque"
              name="name"
              value={brandlist.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              {" "}
              description{" "}
            </label>
            <textarea
              className="form-control"
              placeholder="description de la marque"
              id="exampleFormControlTextarea1"
              rows="1"
              value={brandlist.description}
              name="description"
              onChange={(e) => handleChange(e)}
              required
            ></textarea>
          </div>

          {loadingCreateBrand && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {createBrandErrors && (
            <div className="alert alert-danger" role="alert">
              {createBrandErrors}
            </div>
          )}
          {createdBrand && (
            <div className="alert alert-success" role="alert">
              Brand Créé !
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
      <Modal show={modalShowEdit} onHide={clearStateEdit}>
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Créer Marque
          </h5>
        </Modal.Header>
        <Modal.Body className="m-3">
          <div style={styles.container}>
            {!selectedImage && (
              <div
                className="upload_image_edit mt-4 mb-4 mx-auto"
                style={{
                  backgroundImage: `url(${brandlistEdit?.logo?.imageURL})`,
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
                  {/*  <FontAwesomeIcon icon={faTrashAlt} /> */}
                </button>
              </div>
            )}
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Nom de la Marque{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Nom"
              name="name"
              value={brandlistEdit.name}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              {" "}
              Description{" "}
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              placeholder="Description de la marque"
              name="description"
              value={brandlistEdit.description}
              onChange={(e) => handleChangeEdit(e)}
            ></textarea>
          </div>

          {loadingUpdateBrand && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {updateBrandErrors && (
            <div className="alert alert-danger" role="alert">
              {updateBrandErrors}
            </div>
          )}
          {(brandeditSuccess || brandImageEditSuccess) && (
            <div className="alert alert-success" role="alert">
              Marque Mis a Jour!
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
export default Brands;
