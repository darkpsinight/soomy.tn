import { useState, useEffect } from "react";
import {
  CTableHead,
  CTableBody,
  CTable,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CBreadcrumbItem,
  CBreadcrumb,
  CContainer,
  CHeader,
  CProgress,
  CAvatar,
  CBadge,
  CFormSelect,
} from "@coreui/react";
import { cilPenAlt, cilTrash, cilGamepad, cilSearch } from "@coreui/icons";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import routes from "../../../routes";
import {
  createProduct,
  updateProduct,
  updateProductImage,
  updateProductImage1,
  updateProductImage2,
  clearProductErrors,
  fetchProductList,
  getProductPagination,
  deleteProduct,
  editproduct,
} from "../../../redux/productSlice";
import { getTotalCategories } from "../../../redux/categorySlice";
import { getTotalBrands } from "../../../redux/brandSlice";
import { getTotalPartners } from "../../../redux/partnerSlice";
const Products = () => {
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
    subContainer: {
      display: "flex",
      maxWidth: "45%",
      maxHeight: "150px",
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
    image: { maxWidth: "100%", maxHeight: "150px", objectFit: "contain" },
    delete: {
      cursor: "pointer",
      border: "1px gray solid",
      height: "40px",
      width: "100%",
    },
  };
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImage1, setSelectedImage1] = useState();
  const [selectedImage2, setSelectedImage2] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [productInput, setProductInput] = useState({});
  const [productInputEdit, setProductInputEdit] = useState({});
  const [SearchTerm, setSearchTerm] = useState("");
  const [check, setCheck] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchBy, setSearchBy] = useState("title");
  const [showSearch, setShowSearch] = useState();
  const [productSearch, setProductSearch] = useState("");
  const selectAll = () => {
    setCheck(!check);
  };

  const [show, setShow] = useState(false);

  const product = useSelector((state) => state.product);
  const {
    products,
    paginateProduct,
    createdProduct,
    loadingCreateProduct,
    editedproduct,
    createProductErrors,
    updateProductErrors,
    loadingUpdateProduct,
    producteditSuccess,
    productImageEditSuccess,
    productList,
    loadingProductList,
    ProductListErrors,
  } = product;
  const categorie = useSelector((state) => state.category);
  const { totalCategoryList } = categorie;
  const marque = useSelector((state) => state.brand);
  const { brandTotalList } = marque;
  const partenaire = useSelector((state) => state.partner);
  const { partnerTotalList } = partenaire;

  // This function will be triggered when the file field change
  const {
    title,
    subTitle,
    description,
    prix,
    prixPromo,
    garantie,
    partner,
    brand,
    category,
    image,
    image1,
    image2,
  } = editedproduct;
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const imageChange1 = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage1(e.target.files[0]);
    }
  };
  const imageChange2 = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage2(e.target.files[0]);
    }
  };

  useEffect(() => {
    setProductInputEdit({
      title,
      subTitle,
      description,
      prix,
      prixPromo,
      garantie,
      partner,
      brand,
      category,
      image,
      image1,
      image2,
    });
    setSearchTerm(partner?.name);
  }, [editedproduct]);

  useEffect(() => {
    dispatch(getTotalCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTotalBrands());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTotalPartners());
  }, [dispatch]);
  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  const removeSelectedImage1 = () => {
    setSelectedImage1();
  };
  const removeSelectedImage2 = () => {
    setSelectedImage2();
  };

  const handleChange = (e) => {
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const clickout = () => {
    setTimeout(() => {
      setShow(false);
    }, 200);
  };
  const handleChangeEdit = (e) => {
    setProductInputEdit({
      ...productInputEdit,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeEditPartner = (elm) => {
    setProductInputEdit({
      ...productInputEdit,
      partner: elm?._id,
    });
    setSearchTerm(elm.name);
  };
  const handleChangePartner = (elm) => {
    setProductInput({
      ...productInput,
      partner: elm._id,
    });
    setSearchTerm(elm.name);
  };

  const handleSubmitEdit = () => {
    dispatch(clearProductErrors());
    dispatch(
      updateProduct({
        id: editedproduct._id,
        data: productInputEdit,
        page: paginateProduct?.page,
      })
    );

    if (selectedImage)
      dispatch(
        updateProductImage({
          id: editedproduct._id,
          file: selectedImage,
          page: paginateProduct?.page,
        })
      );
    if (selectedImage1)
      dispatch(
        updateProductImage1({
          id: editedproduct._id,
          file: selectedImage1,
          page: paginateProduct?.page,
        })
      );
    if (selectedImage2)
      dispatch(
        updateProductImage2({
          id: editedproduct._id,
          file: selectedImage2,
          page: paginateProduct?.page,
        })
      );
  };

  const handleSubmit = () => {
    dispatch(clearProductErrors());
    dispatch(
      createProduct({
        productInput,
        file: selectedImage,
        file1: selectedImage1,
        file2: selectedImage2,
        page: paginateProduct?.page,
      })
    );
  };
  const clearState = () => {
    setModalShow(false);
    setProductInput({
      name: "",
      prix: "",
      prixPromo: "",
      description: "",
      garantie: "",
      brand: "",
      category: "",
      partner: "",
    });
    setSelectedImage();
    setSelectedImage1();
    setSelectedImage2();

    setSearchTerm("");
    dispatch(clearProductErrors());
  };
  const clearStateEdit = () => {
    setModalShowEdit(false);
    setProductInputEdit({
      name: "",
      prix: "",
      prixPromo: "",
      description: "",
      garantie: "",
      brand: "",
      category: "",
      partner: "",
      image: "",
      image1: "",
      image2: "",
    });
    setSelectedImage();
    setSelectedImage1();
    setSelectedImage2();

    setSearchTerm("");
    dispatch(clearProductErrors());
  };

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
    setLoader(true);
    dispatch(getProductPagination()).then((res) => {
      setShowSearch(false);
      return setLoader(false);
    });
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
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                onFocus={() => {
                  dispatch(fetchProductList()).then((res) =>
                    setShowSearch(true)
                  );
                }}
              />
              <select
                onChange={(e) => {
                  setSearchBy(e.target.value);
                }}
              >
                <option value="title">Nom</option>
                <option value="category">Catégorie</option>
                <option value="brand">Marque</option>
              </select>
            </div>
            <button
              className="d-flex align-items-center text-gray text-center justify-content-center mt-3 mt-md-0 plus-button"
              onClick={() => setModalShow(true)}
            >
              <Plus /> Ajouter un Produit
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
            <CTableHeaderCell className="text-center">Prix</CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Partnaire
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Catégory
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">Marque</CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Garantie
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Date de Création
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {paginateProduct?.productList
            ?.filter((elm) =>
              searchBy === "title"
                ? elm?.title
                    ?.toLowerCase()
                    ?.includes(productSearch.toLowerCase())
                : searchBy === "category"
                ? elm?.category?.name
                    ?.toLowerCase()
                    ?.includes(productSearch.toLowerCase())
                : searchBy === "brand"
                ? elm?.brand?.name
                    ?.toLowerCase()
                    ?.includes(productSearch.toLowerCase())
                : true
            )
            ?.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={item?.image?.imageURL} />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item?.title}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item?.subTitle}</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item?.prix} Dt</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CAvatar size="sm" src={item?.partner?.image?.imageURL} />
                  <div className="small text-medium-emphasis">
                    <span>{item?.partner?.name}</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <span className="badge rounded-pill text-bg-light">
                    {item?.category?.name}
                  </span>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CAvatar size="sm" src={item?.brand?.logo?.imageURL} />
                  <div className="small text-medium-emphasis">
                    <span>{item?.brand?.name}</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="small text-medium-emphasis">
                    <span>{item?.garantie ? item?.garantie : "-"} Mois</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="small text-medium-emphasis">
                    <span>{format(new Date(item.createdAt), "Pp")}</span>
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <CIcon
                    className="mx-2"
                    icon={cilPenAlt}
                    onClick={() => {
                      {
                        dispatch(editproduct(item));
                        setModalShowEdit(true);
                      }
                    }}
                  ></CIcon>
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
                          deleteProduct({
                            id: item._id,
                            page: paginateProduct.page,
                          })
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
            dispatch(getProductPagination({  page: 1 }));
          }}
        />

        <Pagination.Prev
          onClick={() => {
            dispatch(
            getProductPagination({
                
                page:
                  paginateProduct?.page === 1
                    ? paginateProduct?.totalPages
                    : paginateProduct?.page - 1,
              })
            );
          }}
        />
        <Pagination.Item
          onClick={() => {
            dispatch(getProductPagination({  page: 1 }));
          }}
          active={paginateProduct?.page === 1 ? true : false}
        >
          {1}
        </Pagination.Item>
        {paginateProduct?.totalPages > 5 &&
          paginateProduct?.page > 3 && <Pagination.Ellipsis />}
        {paginateProduct?.totalPages === 3 && (
          <Pagination.Item
            onClick={() => {
              dispatch(getProductPagination({  page: 2 }));
            }}
            active={paginateProduct?.page === 2 ? true : false}
          >
            {2}
          </Pagination.Item>
        )}
        {paginateProduct?.totalPages > 4 &&
          [...Array(3).keys()]
            .map(
              (i) =>
                i +
                (paginateProduct?.page ===
                paginateProduct?.totalPages - 2
                  ? paginateProduct?.page - 2
                  : paginateProduct?.page ===
                    paginateProduct?.totalPages - 1
                  ? paginateProduct?.page - 3
                  : paginateProduct?.page ===
                    paginateProduct?.totalPages
                  ? paginateProduct?.page - 4
                  : paginateProduct?.page === 1
                  ? paginateProduct?.page
                  : paginateProduct?.page === 2 ||
                    paginateProduct?.page === 3
                  ? 1
                  : paginateProduct?.page - 2)
            )
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                  getProductPagination({  page: elm + 1 })
                  );
                }}
                active={paginateProduct?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {paginateProduct?.totalPages === 4 &&
          [...Array(2).keys()]
            .map(
              (i) =>
                i + 1
               
            )
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                  getProductPagination({  page: elm + 1 })
                  );
                }}
                active={paginateProduct?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {paginateProduct?.totalPages > 5 &&
          paginateProduct?.totalPages - 2 > paginateProduct?.page && (
            <Pagination.Ellipsis />
          )}
        {
          (paginateProduct?.totalPages > 1 && (
            <Pagination.Item
              onClick={() => {
                dispatch(
                getProductPagination({
                    
                    page: paginateProduct?.totalPages,
                  })
                );
              }}
              active={
                paginateProduct?.totalPages === paginateProduct?.page
                  ? true
                  : false
              }
            >
              {paginateProduct?.totalPages}
            </Pagination.Item>
          ))}
        <Pagination.Next
          onClick={() => {
            dispatch(
            getProductPagination({
                
                page:
                  paginateProduct.page === paginateProduct?.totalPages
                    ? 1
                    : paginateProduct?.page + 1,
              })
            );
          }}
        />
        <Pagination.Last
          onClick={() => {
            dispatch(
            getProductPagination({
               
                page: paginateProduct?.totalPages,
              })
            );
          }}
        />
      </Pagination>
       
         
      ) : null}
      {/****************************************Modal Creation*************************************************************** */}
      <Modal
        show={modalShow}
        onHide={clearState}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Créer Produit
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
                  {/*       <FontAwesomeIcon icon={faTrashAlt} /> */}
                </button>
              </div>
            )}
          </div>
          <div className="d-flex">
            <div style={styles.subContainer}>
              {!selectedImage1 && (
                <div className="upload_image mt-4 mb-4 mx-auto">
                  <span>Upload Image</span>
                  <input
                    accept="image/*"
                    type="file"
                    className="photo-input"
                    onChange={imageChange1}
                  />
                </div>
              )}
              {selectedImage1 && (
                <div style={styles.preview}>
                  <img
                    src={URL.createObjectURL(selectedImage1)}
                    style={styles.image}
                    alt="Thumb"
                  />

                  <button onClick={removeSelectedImage1} style={styles.delete}>
                    {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
                  </button>
                </div>
              )}
            </div>
            <div style={styles.subContainer}>
              {!selectedImage2 && (
                <div className="upload_image mt-4 mb-4 mx-auto">
                  <span>Upload Image</span>
                  <input
                    accept="image/*"
                    type="file"
                    className="photo-input"
                    onChange={imageChange2}
                  />
                </div>
              )}
              {selectedImage2 && (
                <div style={styles.preview}>
                  <img
                    src={URL.createObjectURL(selectedImage2)}
                    style={styles.image}
                    alt="Thumb"
                  />

                  <button onClick={removeSelectedImage2} style={styles.delete}>
                    {/*   <FontAwesomeIcon icon={faTrashAlt} /> */}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Nom du Produit{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Nom du Produit"
              name="title"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Sous-titre du Produit{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Sous-titre"
              name="subTitle"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="d-flex mb-1 ">
            <div className="d-flex flex-column justify-content-left w-100 ">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Prix{" "}
              </label>
              <input
                type="number"
                className="form-control w-100"
                id="exampleFormControlInput1"
                placeholder="prix"
                name="prix"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mb-1 d-flex flex-column justify-content-left ">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              {" "}
              description{" "}
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              required
              name="description"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>

          <div className="mb-1 d-flex">
            <div className="w-50 d-flex flex-column justify-content-left pe-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Marques{" "}
              </label>
              <select
                className="form-control  w-100"
                id="exampleFormControlInput1"
                name="brand"
                onChange={(e) => handleChange(e)}
              >
                {brandTotalList
                  ? brandTotalList?.brands?.map((elm) => (
                      <option value={elm._id}>{elm.name}</option>
                    ))
                  : null}
              </select>
            </div>
            <div className="w-50 d-flex flex-column justify-content-left ps-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start ps-2"
              >
                {" "}
                Categories{" "}
              </label>
              <select
                className="form-control  w-100"
                id="exampleFormControlInput1"
                name="category"
                onChange={(e) => handleChange(e)}
              >
                {totalCategoryList
                  ? totalCategoryList?.categories?.map((elm) => (
                      <option value={elm._id}>{elm.name}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="mb-1 d-flex flex-column justify-content-left position-relative">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              {" "}
              Partenaires{" "}
            </label>
            <input
              type="text"
              className="form-control"
              onFocus={() => setShow(true)}
              onBlur={clickout}
              id="exampleFormControlInput1"
              placeholder="partner"
              name="partner"
              autocomplete="off"
              value={SearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {show && (
              <div className="search-card">
                <ul>
                  {partnerTotalList
                    ? partnerTotalList?.partners
                        ?.filter((elm) =>
                          elm?.name
                            ?.toLowerCase()
                            ?.match(SearchTerm?.toLowerCase()?.trim())
                        )
                        ?.map((elm) => (
                          <li onClick={() => handleChangePartner(elm)}>
                            {elm?.name}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            )}
          </div>
          <div className="d-flex mb-1">
            <div className="w-100 d-flex flex-column justify-content-left">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Garantie{" "}
              </label>
              <input
                type="number"
                className="form-control "
                id="exampleFormControlInput1"
                placeholder="Garantie"
                name="garantie"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          {loadingCreateProduct && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {createProductErrors && (
            <div className="alert alert-danger" role="alert">
              {createProductErrors}
            </div>
          )}
          {createdProduct && (
            <div className="alert alert-success" role="alert">
              Produit Créé !
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
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

      {/****************************************END Modal*************************************************************** */}
      {/****************************************Modal Edit*************************************************************** */}
      <Modal
        show={modalShowEdit}
        onHide={clearStateEdit}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <h5 className="modal-title" id="exampleModalLabel">
            Editer Produit
          </h5>
        </Modal.Header>
        <Modal.Body className="m-3">
          <div style={styles.container}>
            {!selectedImage && (
              <div
                className="upload_image_edit mt-4 mb-4 mx-auto"
                style={{
                  backgroundImage: `url(${productInputEdit?.image?.imageURL})`,
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
                  {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
                </button>
              </div>
            )}
          </div>
          <div className="d-flex">
            <div style={styles.subContainer}>
              {!selectedImage1 && (
                <div
                  className="upload_image_edit mt-4 mb-4 mx-auto"
                  style={{
                    backgroundImage: `url(${productInputEdit?.image1?.imageURL})`,
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
                    onChange={imageChange1}
                  />
                </div>
              )}
              {selectedImage1 && (
                <div style={styles.preview}>
                  <img
                    src={URL.createObjectURL(selectedImage1)}
                    style={styles.image}
                    alt="Thumb"
                  />

                  <button onClick={removeSelectedImage1} style={styles.delete}>
                    {/*  <FontAwesomeIcon icon={faTrashAlt} /> */}
                  </button>
                </div>
              )}
            </div>
            <div style={styles.subContainer}>
              {!selectedImage2 && (
                <div
                  className="upload_image_edit mt-4 mb-4 mx-auto"
                  style={{
                    backgroundImage: `url(${productInputEdit?.image2?.imageURL})`,
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
                    onChange={imageChange2}
                  />
                </div>
              )}
              {selectedImage2 && (
                <div style={styles.preview}>
                  <img
                    src={URL.createObjectURL(selectedImage2)}
                    style={styles.image}
                    alt="Thumb"
                  />

                  <button onClick={removeSelectedImage2} style={styles.delete}>
                    {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Nom du Produit{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Nom du Produit"
              name="title"
              value={productInputEdit.title}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>

          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Sous-titre{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Sous-titre"
              name="subTitle"
              value={productInputEdit.subTitle}
              onChange={(e) => handleChangeEdit(e)}
            />
          </div>
          <div className="d-flex mb-1 ">
            <div className="d-flex flex-column justify-content-left w-100">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Prix{" "}
              </label>
              <input
                type="number"
                className="form-control w-100"
                id="exampleFormControlInput1"
                placeholder="prix"
                name="prix"
                value={productInputEdit.prix}
                onChange={(e) => handleChangeEdit(e)}
              />
            </div>
          </div>
          <div className="mb-1 d-flex flex-column justify-content-left ">
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
              name="description"
              value={productInputEdit.description}
              onChange={(e) => handleChangeEdit(e)}
            ></textarea>
          </div>

          <div className="mb-1 d-flex">
            <div className="w-50 d-flex flex-column justify-content-left pe-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Marques{" "}
              </label>
              <select
                className="form-control  w-100"
                id="exampleFormControlInput1"
                name="brand"
                value={productInputEdit?.brand?._id}
                onChange={(e) => handleChangeEdit(e)}
              >
                {brandTotalList
                  ? brandTotalList?.brands?.map((elm) => (
                      <option value={elm._id}>{elm.name}</option>
                    ))
                  : null}
              </select>
            </div>
            <div className="w-50 d-flex flex-column justify-content-left ps-1">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start ps-2"
              >
                {" "}
                Categories{" "}
              </label>
              <select
                className="form-control  w-100"
                id="exampleFormControlInput1"
                name="category"
                value={productInputEdit?.category?._id}
                onChange={(e) => handleChangeEdit(e)}
              >
                <option disabled>choose categorie ..</option>
                {totalCategoryList
                  ? totalCategoryList?.categories?.map((elm) => (
                      <option value={elm._id}>{elm.name}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="mb-1 d-flex flex-column justify-content-left position-relative">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              {" "}
              Partenaires{" "}
            </label>
            <input
              type="text"
              className="form-control"
              onFocus={() => setShow(true)}
              onBlur={clickout}
              id="exampleFormControlInput1"
              placeholder="partner"
              name="partner"
              autocomplete="off"
              value={SearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {show && (
              <div className="search-card">
                <ul>
                  {partnerTotalList
                    ? partnerTotalList ?.partners
                        ?.filter((elm) =>
                          elm?.name
                            ?.toLowerCase()
                            ?.match(SearchTerm?.toLowerCase()?.trim())
                        )
                        ?.map((elm) => (
                          <li onClick={() => handleChangeEditPartner(elm)}>
                            {elm.name}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            )}
          </div>
          <div className="d-flex mb-1">
            <div className="w-100 d-flex flex-column justify-content-left">
              <label
                for="exampleFormControlInput1"
                className="modal-label text-start"
              >
                {" "}
                Garantie{" "}
              </label>
              <input
                type="number"
                className="form-control "
                id="exampleFormControlInput1"
                placeholder="Garantie"
                name="garantie"
                value={productInputEdit.garantie}
                onChange={(e) => handleChangeEdit(e)}
              />
            </div>
          </div>
          {loadingUpdateProduct && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {updateProductErrors && (
            <div className="alert alert-danger" role="alert">
              {updateProductErrors}
            </div>
          )}
          {(producteditSuccess || productImageEditSuccess) && (
            <div className="alert alert-success" role="alert">
              Produit Mis a jour !
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
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
      {/****************************************END Edit*************************************************************** */}
    </>
  );
};
export default Products;
