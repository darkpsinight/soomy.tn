import { useState, useEffect } from "react";
import ParticipationModal from "../../../components/RoomParticipation";
import Pagination from "react-bootstrap/Pagination";
import {
  CTableHead,
  CTableBody,
  CTable,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CAvatar,
  CBadge,
  CFormSelect,
  CBreadcrumbItem,
  CBreadcrumb,
  CContainer,
  CHeader,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilPenAlt,
  cilTrash,
  cilStar,
  cilGamepad,
  cilWallet,
  cilSearch,
  cilBadge,
  cilListNumberedRtl,
  cilOptions,
} from "@coreui/icons";
import gold from "../../../assets/images/gold.png";
import routes from "../../../routes";
import silver from "../../../assets/images/silver.png";
import copper from "../../../assets/images/bronze.png";
import CIcon from "@coreui/icons-react";
import { useLocation } from "react-router-dom";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";
import { useDispatch, useSelector } from "react-redux";
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
import Creation from "../../../components/modals/roomModal/creation";
import Update from "../../../components/modals/roomModal/update";
import { fetchProductList } from "../../../redux/productSlice";
import ParticipationProgress from "../../../components/ParticipationProgress";
import { setRoomToggle, setRoomToggleUpdate } from "../../../redux/modalSlice";
import WinnerDashboardAuctionModal from "../../../components/modals/WinnerDashboardAuctionModal/WinnerDashboardAuctionModal";
import TenLastMiseModal from "../../../components/modals/TenLastMiseModal/TenLastMiseModal";

const Auctions = () => {
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
  const [winnerModalShow, setWinnerModalShow] = useState(false);
  const [tenLastMisesModalShow, setTenLastMisesModalShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [tenLastMisesData, setTenLastMiseData] = useState(null);

  const room = useSelector((state) => state.room);

  const { editedRoom, auctions } = room;
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

  useEffect(() => {
    (async () => dispatch(fetchProductList()))();
  }, [dispatch]);

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
  const {} = Room;
  const handleRentableEdit = (elm) => {
    dispatch(
      updateRoom({
        id: elm._id,
        data: { privilege: elm.privilege === "rentable" ? "none" : "rentable" },
      })
    ).then(() => dispatch(fetchRoomListPagination({ page: auctions?.page })));
  };
  const handleSelectionEdit = (elm) => {
    dispatch(
      updateRoom({
        id: elm._id,
        data: { privilege: elm.privilege === "selected" ? "none" : "selected" },
      })
    ).then(() => dispatch(fetchRoomListPagination({ page: auctions?.page })));
  };
  const handleStatusEdit = (id, value) => {
    dispatch(
      updateRoom({ id: id, data: { status: value }, page: auctions?.page })
    ).then(() => dispatch(fetchRoomListPagination()));
    if (value === "enable") {
      dispatch(
        updateRoom({
          id: id,
          data: { startDate: new Date() },
          page: auctions?.page,
        })
      ).then(() => dispatch(fetchRoomListPagination()));
    }
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
    (async () =>
      dispatch(fetchRoomListPagination()).then((res) =>
        setShowSearch(false)
      ))();
  }, []);

  const handleWinnerModal = (userId) => {
    setWinnerModalShow(true);
    setSelectedUserId(userId);
  };

  const handleCloseWinnerModal = () => {
    setWinnerModalShow(false);
  };

  const handleTenLastMisesModal = (tenLastMises) => {
    setTenLastMisesModalShow(true);
    setTenLastMiseData(tenLastMises);
  };

  const handleCloseTenLastMisesModal = () => {
    setTenLastMisesModalShow(false);
  };

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
                value={auctionSearch}
                onChange={(e) => setAuctionSearch(e.target.value)}
                onFocus={() => {
                  dispatch(fetchRoomList()).then((res) => setShowSearch(true));
                }}
              />
              <select
                onChange={(e) => {
                  setSearchBy(e.target.value);
                }}
              >
                <option value="name">Nom</option>
                <option value="category">Catégorie</option>
                <option value="brand">Marque</option>
              </select>
            </div>
            <button
              className="d-flex align-items-center text-gray text-center justify-content-center mt-3 mt-md-0 plus-button"
              onClick={() => dispatch(setRoomToggle(true))}
            >
              <Plus /> Ajouter une enchère
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
            <CTableHeaderCell>Nom </CTableHeaderCell>
            <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
            <CTableHeaderCell>Catégorie</CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Participation
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">Type</CTableHeaderCell>
            <CTableHeaderCell>Changer Status</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {auctions?.rooms
            ?.filter((elm) =>
              searchBy === "name"
                ? elm?.product?.title
                    ?.toLowerCase()
                    ?.includes(auctionSearch.toLowerCase())
                : searchBy === "category"
                ? elm?.product?.category?.name
                    ?.toLowerCase()
                    ?.includes(auctionSearch.toLowerCase())
                : searchBy === "brand"
                ? elm?.product?.brand?.name
                    ?.toLowerCase()
                    ?.includes(auctionSearch.toLowerCase())
                : true
            )
            .map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={item?.product?.image?.imageURL} />
                </CTableDataCell>
                <CTableDataCell
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setParticipationShow(true);
                    setRoomId(item._id);
                  }}
                >
                  <div>{item?.product?.title}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item?.product?.subTitle}</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item?.status === "enable" ? (
                    <CBadge color="success">En cours</CBadge>
                  ) : item?.status === "pending" ? (
                    <CBadge color="warning">En attente</CBadge>
                  ) : item?.status === "finished" ? (
                    <CBadge color="danger">Terminée</CBadge>
                  ) : (
                    <CBadge color="secondary">Déactivée</CBadge>
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item?.roomCategory}</div>
                </CTableDataCell>
                <ParticipationProgress item={item} />

                <CTableDataCell className="text-center">
                  {item?.niveau === "gold" ? (
                    <CAvatar size="sm" src={gold} />
                  ) : item?.niveau === "silver" ? (
                    <CAvatar size="sm" src={silver} />
                  ) : (
                    <CAvatar size="sm" src={copper} />
                  )}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CFormSelect
                    aria-label="Default select example"
                    value={item?.status}
                    onChange={(e) => handleStatusEdit(item._id, e.target.value)}
                  >
                    <option disabled>Status</option>
                    <option value="enable">En cours</option>
                    <option value="pending">En attente</option>
                    <option value="finished">Terminée</option>
                    <option value="deactivate">Déactivée</option>
                  </CFormSelect>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CIcon
                      className="mx-2"
                      onClick={() => {
                        {
                          dispatch(editRoom(item));
                          dispatch(setRoomToggleUpdate(true));
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
                            "Êtes-vous sûr de vouloir supprimer cette enchère?"
                          )
                        ) {
                          dispatch(deleteRoom(item._id)).then(() => {
                            dispatch(
                              fetchRoomListPagination({
                                page: auctions?.page,
                              })
                            );
                          });
                        }
                      }}
                    />
                    {item.privilege === "selected" ? (
                      <CIcon
                        className="mx-2"
                        style={{ color: "orange" }}
                        onClick={() => handleSelectionEdit(item)}
                        icon={cilStar}
                      />
                    ) : (
                      <CIcon
                        className="mx-2"
                        onClick={() => handleSelectionEdit(item)}
                        icon={cilStar}
                      />
                    )}
                    {item.privilege === "rentable" ? (
                      <CIcon
                        className="ms-2"
                        style={{ color: "red" }}
                        onClick={() => handleRentableEdit(item)}
                        icon={cilWallet}
                      />
                    ) : (
                      <CIcon
                        className="ms-2"
                        onClick={() => handleRentableEdit(item)}
                        icon={cilWallet}
                      />
                    )}
                    {item?.status === "finished" ? (
                      <div className="position-relative">
                        <CDropdown style={{ marginLeft: "10px" }}>
                          <CDropdownToggle
                            caret
                            color="outline-secondary"
                            className="p-0"
                          >
                            <CIcon icon={cilOptions} />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem
                              onClick={() => handleWinnerModal(item?.winner)}
                              style={{ cursor: "pointer" }}
                            >
                              <CIcon icon={cilBadge} className="me-2" />
                              Détails du gagnant
                            </CDropdownItem>
                            <CDropdownItem
                              onClick={() =>
                                handleTenLastMisesModal(item?.tenLastMises)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <CIcon
                                icon={cilListNumberedRtl}
                                className="me-2"
                              />
                              Dix dernières mises
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    ) : null}
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>

      {!showSearch ? (
        <Pagination>
          <Pagination.First
            onClick={() => {
              dispatch(fetchRoomListPagination({ page: 1 }));
            }}
          />

          <Pagination.Prev
            onClick={() => {
              dispatch(
                fetchRoomListPagination({
                  page:
                    auctions?.page === 1
                      ? auctions?.totalPages
                      : auctions?.page - 1,
                })
              );
            }}
          />
          <Pagination.Item
            onClick={() => {
              dispatch(fetchRoomListPagination({ page: 1 }));
            }}
            active={auctions?.page === 1 ? true : false}
          >
            {1}
          </Pagination.Item>
          {auctions?.totalPages > 5 && auctions?.page > 3 && (
            <Pagination.Ellipsis />
          )}
          {auctions?.totalPages === 3 && (
            <Pagination.Item
              onClick={() => {
                dispatch(fetchRoomListPagination({ page: 2 }));
              }}
              active={auctions?.page === 2 ? true : false}
            >
              {2}
            </Pagination.Item>
          )}
          {auctions?.totalPages > 4 &&
            [...Array(3).keys()]
              .map(
                (i) =>
                  i +
                  (auctions?.page === auctions?.totalPages - 2
                    ? auctions?.page - 2
                    : auctions?.page === auctions?.totalPages - 1
                    ? auctions?.page - 3
                    : auctions?.page === auctions?.totalPages
                    ? auctions?.page - 4
                    : auctions?.page === 1
                    ? auctions?.page
                    : auctions?.page === 2 || auctions?.page === 3
                    ? 1
                    : auctions?.page - 2)
              )
              .map((elm) => (
                <Pagination.Item
                  onClick={() => {
                    dispatch(fetchRoomListPagination({ page: elm + 1 }));
                  }}
                  active={auctions?.page === elm + 1 ? true : false}
                >
                  {elm + 1}
                </Pagination.Item>
              ))}
          {auctions?.totalPages === 4 &&
            [...Array(2).keys()]
              .map((i) => i + 1)
              .map((elm) => (
                <Pagination.Item
                  onClick={() => {
                    dispatch(fetchRoomListPagination({ page: elm + 1 }));
                  }}
                  active={auctions?.page === elm + 1 ? true : false}
                >
                  {elm + 1}
                </Pagination.Item>
              ))}
          {auctions?.totalPages > 5 &&
            auctions?.totalPages - 2 > auctions?.page && (
              <Pagination.Ellipsis />
            )}
          {auctions?.totalPages > 1 && (
            <Pagination.Item
              onClick={() => {
                dispatch(
                  fetchRoomListPagination({
                    page: auctions?.totalPages,
                  })
                );
              }}
              active={auctions?.totalPages === auctions?.page ? true : false}
            >
              {auctions?.totalPages}
            </Pagination.Item>
          )}
          <Pagination.Next
            onClick={() => {
              dispatch(
                fetchRoomListPagination({
                  page:
                    auctions.page === auctions?.totalPages
                      ? 1
                      : auctions?.page + 1,
                })
              );
            }}
          />
          <Pagination.Last
            onClick={() => {
              dispatch(
                fetchRoomListPagination({
                  page: auctions?.totalPages,
                })
              );
            }}
          />
        </Pagination>
      ) : null}

      <Creation />
      <Update />
      <ParticipationModal
        id={roomId}
        show={participationShow}
        onHide={() => setParticipationShow(false)}
      />
      <WinnerDashboardAuctionModal
        show={winnerModalShow}
        onHide={handleCloseWinnerModal}
        userId={selectedUserId}
      />
      <TenLastMiseModal
        show={tenLastMisesModalShow}
        onHide={handleCloseTenLastMisesModal}
        tenLastMisesData={tenLastMisesData}
      />
    </>
  );
};
export default Auctions;
