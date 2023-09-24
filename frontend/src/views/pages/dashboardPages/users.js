import React, { useState, useEffect } from "react";
import {
  CTableHead,
  CTableBody,
  CTable,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CBadge,
  CAvatar,
  CBreadcrumb,
  CBreadcrumbItem,
  CContainer,
  CHeader,
} from "@coreui/react";
import { cilTrash, cilPeople, cilInbox, cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { cilCheckCircle, cilBan } from "@coreui/icons";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseDashboard } from "../../../redux/packPurchaseSlice";
import { reduceCredit, getAllUsers } from "../../../redux/userSlice";
import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useLocation } from "react-router-dom";
import routes from "../../../routes";
import "./styles.css";

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  // dispatch getPurchase api by specific user id and get all purchased packs for that user
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getPurchaseDashboard({ id: props.userId }));
    };

    fetchData();
  }, [dispatch, props.userId]);

  // get purchased packs from redux
  const purchasedPacks = useSelector((state) => state.purchase?.purchasedPacks);
  const purchasedPacksData = purchasedPacks?.packPurchases || [];

  // sort packs before map by credit
  const sortedPacks = [...purchasedPacksData].sort(
    (a, b) => a.credit - b.credit
  );

  // handle updateLoading state with MUI spinner
  const updateLoading = useSelector((state) => state.purchase.updateLoading);

  // get updateErrors state from redux to track empty packs of specific user
  const updateErrors = useSelector((state) => state.purchase.updateErrors);

  // handle delete purchased pack by it's id
  const deletePackPurchase = (id, credit) => {
    props.setLoader(true);
    axios
      .delete(`/purchase/deletePurchase/${id}`)
      .then(() =>
        dispatch(
          reduceCredit({
            type: `Pack Bitso ${credit} supprimé`,
            user: userInfo._id,
            service: "Pack supprimé par Admin",
            montant: credit,
            status: "COMPLETED",
            ref: "-",
          })
        )
      )
      .then(() => dispatch(getPurchaseDashboard({ id: props.userId })))
      .then((res) => {
        props.setLoader(false);
        props.setUsers(res.data);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Liste des Packs
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {updateLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* render CircularProgress spinner while loading */}
            <CircularProgress />
          </div>
        ) : updateErrors ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {/* render updateErrors "Aucun pack trouvé" if not null */}
            <Alert severity="info">
              <div style={{ display: "flex", textAlign: "left" }}>
                {updateErrors}
              </div>
            </Alert>
          </Stack>
        ) : (
          <CTable bordered striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Pack image</CTableHeaderCell>
                <CTableHeaderCell>Validité</CTableHeaderCell>
                <CTableHeaderCell>Validité restantes</CTableHeaderCell>
                <CTableHeaderCell>Credit</CTableHeaderCell>
                <CTableHeaderCell>Prix</CTableHeaderCell>
                <CTableHeaderCell>Date d'achat</CTableHeaderCell>
                <CTableHeaderCell>Disponiblilté</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sortedPacks?.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CAvatar size="md" src={item?.pack_id?.image?.imageURL} />
                  </CTableDataCell>
                  <CTableDataCell>{item?.pack_id?.num_uses}</CTableDataCell>
                  <CTableDataCell
                    style={{ color: item?.num_uses === 0 ? "red" : "inherit" }}
                  >
                    {item?.num_uses}
                  </CTableDataCell>
                  <CTableDataCell>{item?.pack_id?.credit}</CTableDataCell>
                  <CTableDataCell>{item?.pack_id?.prix}</CTableDataCell>
                  <CTableDataCell>
                    {item?.createdAt &&
                      new Date(item.createdAt)
                        .toISOString()
                        .replace("T", ", ")
                        .substr(0, 19)}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item?.availability ? (
                      <CIcon
                        icon={cilCheckCircle}
                        size="xl"
                        style={{ color: "#4ff549" }}
                      />
                    ) : (
                      <CIcon icon={cilBan} size="xl" style={{ color: "red" }} />
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    <Tooltip
                      title="Supprimer pack"
                      placement="top"
                      arrow
                      TransitionComponent={Zoom}
                    >
                      <CIcon
                        className="mx-2"
                        icon={cilTrash}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Voulez-vous vraiment supprimer ce pack acheté ?"
                            )
                          ) {
                            deletePackPurchase(item?._id, item?.credit);
                          }
                        }}
                      />
                    </Tooltip>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Users = () => {
  const [users, setUsers] = useState();
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const [UserSearch, setUserSearch] = useState("");
  const [searchBy, setSearchBy] = useState("username");

  const currentLocation = useLocation().pathname;

  // get users from page 1 (page 1 by default)
  useEffect(() => {
    setLoader(true);
    axios.get(`/users/getUsers/1`).then((res) => {
      setLoader(false);
      setUsers(res.data);
    });
  }, []);

  // delete user by his id
  const deleteUser = (id) => {
    setLoader(true);
    axios
      .delete(`/users/deleteUser/${id}`)
      .then(() => axios.get(`/users/getUsers/${users?.page}`))
      .then((res) => {
        setLoader(false);
        setUsers(res.data);
      })
      .catch((error) => {
        setLoader(false);
        if (error.response?.data?.message) {
          window.alert(error.response.data.message);
        } else {
          window.alert(
            "Une erreur s'est produite lors de la suppression de l'utilisateur."
          );
        }
      });
  };

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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        userId={userId}
        users={users}
        setLoader={setLoader}
      />

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
                placeholder="Chercher..."
                value={UserSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                onFocus={() => {
                  dispatch(getAllOrders()).then((res) => setShowSearch(true));
                }}
                onBlur={() => {
                  dispatch(fetchOrderList({ page: orderList?.page })).then(
                    (res) => setShowSearch(false)
                  );
                }}
              />
              <select
                onChange={(e) => setSearchBy(e.target.value)}
                value={searchBy}
              >
                <option value="username">Nom d'utilisateur</option>
                <option value="phone">Téléphone</option>
                <option value="email">E-mail</option>
              </select>
            </div>
          </div>
        </CContainer>
      </CHeader>

      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>Nom & Prénom</CTableHeaderCell>
            <CTableHeaderCell>Nom d'utilisateur</CTableHeaderCell>
            <CTableHeaderCell className="text-center">E-mail</CTableHeaderCell>
            <CTableHeaderCell className="text-center">
              Télephone
            </CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users?.users
            ?.filter((elm) =>
              searchBy === "username"
                ? elm?.username
                    ?.toLowerCase()
                    ?.includes(UserSearch.toLowerCase())
                : searchBy === "phone"
                ? elm?.phone?.toLowerCase()?.includes(UserSearch.toLowerCase())
                : searchBy === "email"
                ? elm?.email?.toLowerCase()?.includes(UserSearch.toLowerCase())
                : true
            )
            .map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={item?.profile_img?.imageURL} />
                </CTableDataCell>
                <CTableDataCell>
                  <div>
                    {item?.firstName} {item?.lastName?.toUpperCase()}
                  </div>
                  <div className="small text-medium-emphasis">
                    <span>{item?.approved ? "Verifié" : "Non Verifié"}</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item?.username}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item?.email}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {item?.phone ? item?.phone : "-"}
                </CTableDataCell>

                <CTableDataCell>
                  <Tooltip
                    title="Supprimer user"
                    placement="top"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <CIcon
                      className="mx-2"
                      icon={cilTrash}
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Êtes-vous sûr de vouloir SUPPRIMER cet utilisateur ?"
                          )
                        ) {
                          deleteUser(item?._id);
                        }
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Voir les packs" placement="top" arrow>
                    <CIcon
                      className="mx-2"
                      icon={cilInbox}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setUserId(item?._id);
                        setModalShow(true);
                      }}
                    />
                  </Tooltip>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      <Pagination>
        <Pagination.First
          onClick={() => {
            axios.get(`/users/getUsers/1`).then((res) => {
              setLoader(false);
              setUsers(res.data);
            });
          }}
        />

        <Pagination.Prev
          onClick={() => {
            axios
              .get(
                `/users/getUsers/${
                  users?.page === 1 ? users?.totalPages : users?.page - 1
                }`
              )
              .then((res) => {
                setLoader(false);
                setUsers(res.data);
              });
          }}
        />
        <Pagination.Item
          onClick={() => {
            axios.get(`/users/getUsers/1`).then((res) => {
              setLoader(false);
              setUsers(res.data);
            });
          }}
          active={users?.page === 1 ? true : false}
        >
          {1}
        </Pagination.Item>
        {users?.totalPages > 5 && users?.page > 3 && <Pagination.Ellipsis />}
        {users?.totalPages === 3 && (
          <Pagination.Item
            onClick={() => {
              axios.get(`/users/getUsers/2`).then((res) => {
                setLoader(false);
                setUsers(res.data);
              });
            }}
            active={users?.page === 2 ? true : false}
          >
            {2}
          </Pagination.Item>
        )}
        {users?.totalPages > 4 &&
          [...Array(3).keys()]
            .map(
              (i) =>
                i +
                (users?.page === users?.totalPages - 2
                  ? users?.page - 2
                  : users?.page === users?.totalPages - 1
                  ? users?.page - 3
                  : users?.page === users?.totalPages
                  ? users?.page - 4
                  : users?.page === 1
                  ? users?.page
                  : users?.page === 2 || users?.page === 3
                  ? 1
                  : users?.page - 2)
            )
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  axios.get(`/users/getUsers/${elm + 1}`).then((res) => {
                    setLoader(false);
                    setUsers(res.data);
                  });
                }}
                active={users?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {users?.totalPages === 4 &&
          [...Array(2).keys()]
            .map((i) => i + 1)
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  axios.get(`/users/getUsers/${elm + 1}`).then((res) => {
                    setLoader(false);
                    setUsers(res.data);
                  });
                }}
                active={users?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {users?.totalPages > 5 && users?.totalPages - 2 > users?.page && (
          <Pagination.Ellipsis />
        )}
        {users?.totalPages > 1 && (
          <Pagination.Item
            onClick={() => {
              axios.get(`/users/getUsers/${users?.totalPages}`).then((res) => {
                setLoader(false);
                setUsers(res.data);
              });
            }}
            active={users?.totalPages === users?.page ? true : false}
          >
            {users?.totalPages}
          </Pagination.Item>
        )}
        <Pagination.Next
          onClick={() => {
            axios
              .get(
                `/users/getUsers/${
                  users.page === users?.totalPages ? 1 : users?.page + 1
                }`
              )
              .then((res) => {
                setLoader(false);
                setUsers(res.data);
              });
          }}
        />
        <Pagination.Last
          onClick={() => {
            axios.get(`/users/getUsers/${users?.totalPages}`).then((res) => {
              setLoader(false);
              setUsers(res.data);
            });
          }}
        />
      </Pagination>
    </>
  );
};
export default Users;
