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
  CBreadcrumbItem,
  CBreadcrumb,
  CContainer,
  CHeader,
} from "@coreui/react";
import { cilPenAlt, cilTrash, cilSearch, cilGamepad } from "@coreui/icons";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import CIcon from "@coreui/icons-react";
import Pagination from "react-bootstrap/Pagination";
import Creation from "../../../components/modals/packModal/creation";
import Update from "../../../components/modals/packModal/update";
import {
  editPack,
  deletePack,
  updatePack,
  updatePackImage,
  clearPackErrors,
  fetchPackList,
  getTotalPacks,
} from "../../../redux/packSlice";
import routes from "../../../routes";
import { setPackToggle, setPackToggleUpdate } from "../../../redux/modalSlice";
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
const Packs = () => {
  const [PackSearch, setPackSearch] = useState("");
  const [showSearch, setShowSearch] = useState();
  const [loader, setLoader] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [PacklistEdit, setPacklistEdit] = useState({});
  const dispatch = useDispatch();
  const pack = useSelector((state) => state.pack);
  const currentLocation = useLocation().pathname;
  const { editedPack, Packs } = pack;

  useEffect(() => {
    dispatch(fetchPackList());
  }, [dispatch]);
  const { name, description, logo } = editedPack;

  // This function will be triggered when the "Remove This Image" button is clicked

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
            <button
              className="d-flex align-items-center text-gray text-center justify-content-center mt-3 mt-md-0 plus-button"
              onClick={() => dispatch(setPackToggle(true))}
            >
              <Plus /> Créer un Pack
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
            <CTableHeaderCell>Validité</CTableHeaderCell>
            <CTableHeaderCell>Crédit</CTableHeaderCell>
            <CTableHeaderCell>Prix</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {Packs?.Packs?.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar size="md" src={item?.image?.imageURL} />
              </CTableDataCell>
              <CTableDataCell>
                <div>{item?.num_uses}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item?.credit}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item?.prix}</div>
              </CTableDataCell>

              <CTableDataCell>
                <CIcon
                  className="mx-2"
                  onClick={() => {
                    {
                      dispatch(editPack(item));
                      // setModalShowEdit(true);
                      dispatch(setPackToggleUpdate(true));
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
                      deletePack({
                        id: item._id,
                        // page: Packs.page,
                      })
                    );
                  }}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {!showSearch && Packs && Packs?.length > 0 ? (
        <Pagination>
          <Pagination.First
            onClick={() => {
              dispatch(fetchRoomListPagination({ page: 1 }));
            }}
          />

          <Pagination.Prev
            onClick={() => {
              dispatch(
                fetchPackList({
                  page: Packs?.page === 1 ? Packs?.totalPages : Packs?.page - 1,
                })
              );
            }}
          />
          <Pagination.Item
            onClick={() => {
              dispatch(fetchRoomListPagination({ page: 1 }));
            }}
            active={Packs?.page === 1 ? true : false}
          >
            {1}
          </Pagination.Item>
          {Packs?.totalPages > 5 && Packs?.page > 3 && <Pagination.Ellipsis />}
          {Packs?.totalPages === 3 && (
            <Pagination.Item
              onClick={() => {
                dispatch(fetchRoomListPagination({ page: 2 }));
              }}
              active={Packs?.page === 2 ? true : false}
            >
              {2}
            </Pagination.Item>
          )}
          {Packs?.totalPages > 4 &&
            [...Array(3).keys()]
              .map(
                (i) =>
                  i +
                  (Packs?.page === Packs?.totalPages - 2
                    ? Packs?.page - 2
                    : Packs?.page === Packs?.totalPages - 1
                    ? Packs?.page - 3
                    : Packs?.page === Packs?.totalPages
                    ? Packs?.page - 4
                    : Packs?.page === 1
                    ? Packs?.page
                    : Packs?.page === 2 || Packs?.page === 3
                    ? 1
                    : Packs?.page - 2)
              )
              .map((elm) => (
                <Pagination.Item
                  onClick={() => {
                    dispatch(fetchPackList({ page: elm + 1 }));
                  }}
                  active={Packs?.page === elm + 1 ? true : false}
                >
                  {elm + 1}
                </Pagination.Item>
              ))}
          {Packs?.totalPages === 4 &&
            [...Array(2).keys()]
              .map((i) => i + 1)
              .map((elm) => (
                <Pagination.Item
                  onClick={() => {
                    dispatch(fetchPackList({ page: elm + 1 }));
                  }}
                  active={Packs?.page === elm + 1 ? true : false}
                >
                  {elm + 1}
                </Pagination.Item>
              ))}
          {Packs?.totalPages > 5 && Packs?.totalPages - 2 > Packs?.page && (
            <Pagination.Ellipsis />
          )}
          {Packs?.totalPages > 1 && (
            <Pagination.Item
              onClick={() => {
                dispatch(
                  fetchPackList({
                    page: Packs?.totalPages,
                  })
                );
              }}
              active={Packs?.totalPages === Packs?.page ? true : false}
            >
              {Packs?.totalPages}
            </Pagination.Item>
          )}
          <Pagination.Next
            onClick={() => {
              dispatch(
                fetchPackList({
                  page: Packs.page === Packs?.totalPages ? 1 : Packs?.page + 1,
                })
              );
            }}
          />
          <Pagination.Last
            onClick={() => {
              dispatch(
                fetchPackList({
                  page: Packs?.totalPages,
                })
              );
            }}
          />
        </Pagination>
      ) : null}
      <Creation />
      <Update />
    </>
  );
};
export default Packs;
