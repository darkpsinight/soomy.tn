import React, { useEffect, useState ,useRef} from "react";
import Pagination from "react-bootstrap/Pagination";
import { logout, setCloseModal } from "../../../redux/userSlice";
import { getUserOrder } from "../../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { format } from "date-fns";
const Commandes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isOpen, setOpen] = useState(false);
  const { userInfo, deconnectionLoading, updateImageLoading, showModal } = user;
  const order = useSelector((state) => state.order);
  const { userOrder } = order;
  const participation = useSelector((state) => state.participation);
  const { userParticipationList } = participation;
  const ref = useRef(null)
  useEffect(()=>{
   if(ref?.current){ref.current.scrollIntoView({ block: "center" });}
  },[ref])
  useEffect(() => {
    dispatch(setCloseModal());
  }, []);
  useEffect(() => {
    dispatch(getUserOrder({ id: userInfo._id, page: 1 }));
  }, [dispatch]);
  return (
    <div className="px-lg-3 py-2 profile-table" ref={ref}>
      <h2 className="mx-auto">Mes Commandes</h2>
      <Table className="table edge-shadow" responsive>
        <thead>
          <tr>
            <th scope="col" className="text-center align-middle">
              Reférence
            </th>
            <th scope="col" className="text-center align-middle ">
              Date
            </th>
            <th scope="col" className="text-center align-middle">
              produit
            </th>
            <th scope="col" className="text-center align-middle">
            Etat de livraison
            </th>
            <th scope="col" className="text-center align-middle">
            Etat de paiement
            </th>
            <th scope="col" className="text-center align-middle">
              Expiration
            </th>
            <th scope="col" className="text-center align-middle">
            Total
            </th>
          </tr>
        </thead>
        <tbody>
          {userOrder?.orders?.map((elm) => (
            <tr>
              <th scope="row" className="text-center align-middle">
                {" "}
                <Link
                  style={{ fontSize: "16px", color: "black" }}
                  to={
                    elm?.method_of_paiement
                      ? `/validation/${elm?._id}`
                      : `/checkout/${elm?.room_id?._id}`
                  }
                >
                  {elm?.ref_order}
                </Link>
              </th>
              <td className="text-center align-middle">
                {format(new Date(elm?.date), "P,HH:mm")}
              </td>
              <td className="text-center align-middle">
                {elm?.room_id?.product?.title}
              </td>
              <td className="text-center align-middle">
                {" "}
                {elm?.status_delivery}
              </td>
              <td className="text-center align-middle">
                {elm?.status_payment}
              </td>
              <td className="text-center align-middle">
                {" "}
                {elm?.expiration
                  ? format(new Date(elm?.expiration), "dd/MM/yyyy,HH:mm")
                  : null}
              </td>
              <td className="text-center align-middle">
              {elm?.typeWinner==="soomy" ? (
                                <p>{elm?.room_id?.prixPromo} DT</p>
                              ) : elm?.typeWinner==="premium" ? (
                                <p>{elm?.room_id?.directPrice} DT</p>
                              ): (
                                "---"
                              )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First
          onClick={() => {
            dispatch(getUserOrder({ id: userInfo._id, page: 1 }));
          }}
        />

        <Pagination.Prev
          onClick={() => {
            dispatch(
              getUserOrder({
                id: userInfo._id,
                page:
                  userOrder?.page === 1
                    ? userOrder?.totalPages
                    : userOrder?.page - 1,
              })
            );
          }}
        />
        <Pagination.Item
          onClick={() => {
            dispatch(getUserOrder({ id: userInfo._id, page: 1 }));
          }}
          active={userOrder?.page === 1 ? true : false}
        >
          {1}
        </Pagination.Item>
        {userOrder?.totalPages > 5 &&
          userOrder?.page > 3 && <Pagination.Ellipsis />}
        {userOrder?.totalPages === 3 && (
          <Pagination.Item
            onClick={() => {
              dispatch(getUserOrder({ id: userInfo._id, page: 2 }));
            }}
            active={userOrder?.page === 2 ? true : false}
          >
            {2}
          </Pagination.Item>
        )}
        {userOrder?.totalPages > 4 &&
          [...Array(3).keys()]
            .map(
              (i) =>
                i +
                (userOrder?.page ===
                userOrder?.totalPages - 2
                  ? userOrder?.page - 2
                  : userOrder?.page ===
                    userOrder?.totalPages - 1
                  ? userOrder?.page - 3
                  : userOrder?.page ===
                    userOrder?.totalPages
                  ? userOrder?.page - 4
                  : userOrder?.page === 1
                  ? userOrder?.page
                  : userOrder?.page === 2 ||
                    userOrder?.page === 3
                  ? 1
                  : userOrder?.page - 2)
            )
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                    getUserOrder({ id: userInfo._id, page: elm + 1 })
                  );
                }}
                active={userOrder?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {userOrder?.totalPages === 4 &&
          [...Array(2).keys()]
            .map(
              (i) =>
                i + 1
               
            )
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                    getUserOrder({ id: userInfo._id, page: elm + 1 })
                  );
                }}
                active={userOrder?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {userOrder?.totalPages > 5 &&
          userOrder?.totalPages - 2 > userOrder?.page && (
            <Pagination.Ellipsis />
          )}
        {
          (userOrder?.totalPages > 1 && (
            <Pagination.Item
              onClick={() => {
                dispatch(
                  getUserOrder({
                    id: userInfo._id,
                    page: userOrder?.totalPages,
                  })
                );
              }}
              active={
                userOrder?.totalPages === userOrder?.page
                  ? true
                  : false
              }
            >
              {userOrder?.totalPages}
            </Pagination.Item>
          ))}
        <Pagination.Next
          onClick={() => {
            dispatch(
              getUserOrder({
                id: userInfo._id,
                page:
                  userOrder.page === userOrder?.totalPages
                    ? 1
                    : userOrder?.page + 1,
              })
            );
          }}
        />
        <Pagination.Last
          onClick={() => {
            dispatch(
              getUserOrder({
                id: userInfo._id,
                page: userOrder?.totalPages,
              })
            );
          }}
        />
      </Pagination>
      
    </div>
  );
};

export default Commandes;
