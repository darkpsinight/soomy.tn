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
import {
  createCategory,
  updateCategory,
  clearcategoryErrors,
  fetchCategoryList,
  editcategory,
  deleteCategory,
  getTotalCategories,
} from "../../../redux/categorySlice";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import routes from "../../../routes";
const Categories = () => {
  const dispatch = useDispatch();
  const [filteredCategory, setFilteredCategory] = useState();
  const [categorySearch, setCategorySearch] = useState("");
  const [showSearch, setShowSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [categorieInput, setcategorieInput] = useState({});
  const [categorieInputEdit, setcategorieInputEdit] = useState({});
  const category = useSelector((state) => state.category);
  const currentLocation = useLocation().pathname;
  const {
    createdCategory,
    loadingCreateCategory,
    createCategoryErrors,
    editedcategory,
    loadingUpdateCategory,
    totalCategoryList,
    updateCategoryErrors,
    categoryeditSuccess,
    categoryList,
    loadingCategoryList,
    categoryListErrors,
  } = category;
  const { name, description } = editedcategory;
  const handleChange = (e) => {
    setcategorieInput({ ...categorieInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(clearcategoryErrors());
    setcategorieInput({ ...categorieInput, page: categoryList?.page });
    dispatch(createCategory(categorieInput));
  };
  const handleChangeEdit = (e) => {
    setcategorieInputEdit({
      ...categorieInputEdit._id,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitEdit = () => {
    dispatch(clearcategoryErrors());
    dispatch(
      updateCategory({
        id: editedcategory._id,
        data: categorieInputEdit,
        page: categoryList?.page,
      })
    );
  };
  const clearState = () => {
    setModalShow(false);
    setcategorieInput({ description: "", name: "" });
    dispatch(clearcategoryErrors());
  };
  const clearStateEdit = () => {
    setModalShowEdit(false);
    setcategorieInputEdit({ description: "", name: "" });
    dispatch(clearcategoryErrors());
  };
  useEffect(() => {
    setcategorieInputEdit({ name, description });
  }, [editedcategory]);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchCategoryList())
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
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              onFocus={() => {
                dispatch(getTotalCategories()).then((res) =>
                  setShowSearch(true)
                );
              }}
            />
          </div>
          <button
            className="d-flex align-items-center text-gray text-center justify-content-center mt-3 mt-md-0 plus-button"
            onClick={() => setModalShow(true)}
          >
            <Plus /> Ajouter une Catégorie
          </button>
          </div>
        </CContainer>
      </CHeader>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>
              <CIcon icon={cilGamepad} />
            </CTableHeaderCell>
            <CTableHeaderCell>Nom</CTableHeaderCell>
            <CTableHeaderCell>Date Creation </CTableHeaderCell>
            <CTableHeaderCell>Action </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {categoryList?.categories
            ?.filter((elm) =>
              elm.name.toLowerCase().match(categorySearch?.toLowerCase().trim())
            )
            ?.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell></CTableDataCell>

                <CTableDataCell>
                  <div>{item?.name}</div>
                </CTableDataCell>

                <CTableDataCell>
                  <div>{format(new Date(item.createdAt), "Pp")}</div>
                </CTableDataCell>

                <CTableDataCell>
                  <CIcon
                    className="mx-2"
                    onClick={() => {
                      {
                        dispatch(editcategory(item));
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
                          deleteCategory({
                            id: item._id,
                            page: categoryList.page,
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
              dispatch(fetchRoomListPagination({  page: 1 }));
            }}
          />
  
          <Pagination.Prev
            onClick={() => {
              dispatch(
              fetchCategoryList({
                  
                  page:
                    categoryList?.page === 1
                      ? categoryList?.totalPages
                      : categoryList?.page - 1,
                })
              );
            }}
          />
          <Pagination.Item
            onClick={() => {
              dispatch(fetchRoomListPagination({  page: 1 }));
            }}
            active={categoryList?.page === 1 ? true : false}
          >
            {1}
          </Pagination.Item>
          {categoryList?.totalPages > 5 &&
            categoryList?.page > 3 && <Pagination.Ellipsis />}
          {categoryList?.totalPages === 3 && (
            <Pagination.Item
              onClick={() => {
                dispatch(fetchRoomListPagination({  page: 2 }));
              }}
              active={categoryList?.page === 2 ? true : false}
            >
              {2}
            </Pagination.Item>
          )}
          {categoryList?.totalPages > 4 &&
            [...Array(3).keys()]
              .map(
                (i) =>
                  i +
                  (categoryList?.page ===
                  categoryList?.totalPages - 2
                    ? categoryList?.page - 2
                    : categoryList?.page ===
                      categoryList?.totalPages - 1
                    ? categoryList?.page - 3
                    : categoryList?.page ===
                      categoryList?.totalPages
                    ? categoryList?.page - 4
                    : categoryList?.page === 1
                    ? categoryList?.page
                    : categoryList?.page === 2 ||
                      categoryList?.page === 3
                    ? 1
                    : categoryList?.page - 2)
              )
              .map((elm) => (
                <Pagination.Item
                  onClick={() => {
                    dispatch(
                    fetchCategoryList({  page: elm + 1 })
                    );
                  }}
                  active={categoryList?.page === elm + 1 ? true : false}
                >
                  {elm + 1}
                </Pagination.Item>
              ))}
          {categoryList?.totalPages === 4 &&
            [...Array(2).keys()]
              .map(
                (i) =>
                  i + 1
                 
              )
              .map((elm) => (
                <Pagination.Item
                  onClick={() => {
                    dispatch(
                    fetchCategoryList({  page: elm + 1 })
                    );
                  }}
                  active={categoryList?.page === elm + 1 ? true : false}
                >
                  {elm + 1}
                </Pagination.Item>
              ))}
          {categoryList?.totalPages > 5 &&
            categoryList?.totalPages - 2 > categoryList?.page && (
              <Pagination.Ellipsis />
            )}
          {
            (categoryList?.totalPages > 1 && (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                  fetchCategoryList({
                      
                      page: categoryList?.totalPages,
                    })
                  );
                }}
                active={
                  categoryList?.totalPages === categoryList?.page
                    ? true
                    : false
                }
              >
                {categoryList?.totalPages}
              </Pagination.Item>
            ))}
          <Pagination.Next
            onClick={() => {
              dispatch(
              fetchCategoryList({
                  
                  page:
                    categoryList.page === categoryList?.totalPages
                      ? 1
                      : categoryList?.page + 1,
                })
              );
            }}
          />
          <Pagination.Last
            onClick={() => {
              dispatch(
              fetchCategoryList({
                 
                  page: categoryList?.totalPages,
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
            Créer Categorie
          </h5>
        </Modal.Header>
        <Modal.Body className="m-3">
          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Nom Categorie{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Nom Categorie"
              name="name"
              required
              value={categorieInput.name}
              onChange={(e) => handleChange(e)}
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
              id="exampleFormControlTextarea1"
              rows="1"
              name="description"
              placeholder="Description"
              required
              value={categorieInput.description}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>

          {loadingCreateCategory && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {createCategoryErrors && (
            <div className="alert alert-danger" role="alert">
              {createCategoryErrors}
            </div>
          )}
          {createdCategory && (
            <div className="alert alert-success" role="alert">
              Categorie Créé !
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
            Créer Categorie
          </h5>
        </Modal.Header>
        <Modal.Body className="m-3">
          <div className="mb-1 d-flex flex-column justify-content-left">
            <label
              for="exampleFormControlInput1"
              className="modal-label text-start"
            >
              Nom Categorie{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Nom Categorie"
              name="name"
              value={categorieInputEdit.name}
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
              name="description"
              placeholder="Description"
              value={categorieInputEdit.description}
              onChange={(e) => handleChangeEdit(e)}
            ></textarea>
          </div>

          {loadingUpdateCategory && (
            <div className="w-100 mt-2 d-flex justify-content-center">
              <div className="spinner-border mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {updateCategoryErrors && (
            <div className="alert alert-danger" role="alert">
              {updateCategoryErrors}
            </div>
          )}
          {categoryeditSuccess && (
            <div className="alert alert-success" role="alert">
              Categorie Mis a jour !
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
      {/****************************************END Modal Edit*************************************************************** */}
    </>
  );
};
export default Categories;
