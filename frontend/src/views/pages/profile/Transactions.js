import React, { useEffect, useState, useRef } from "react";
import Pagination from "react-bootstrap/Pagination";
import { logout, setCloseModal } from "../../../redux/userSlice";
import { getTransactionsbyId } from "../../../redux/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Table from "react-bootstrap/Table";

const Transactions = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect(() => {
    if (ref?.current) {
      ref.current.scrollIntoView({ block: "center" });
    }
  }, [ref]);
  useEffect(() => {
    dispatch(setCloseModal());
  }, []);

  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const transactions = useSelector((state) => state.transaction);
  const { userTransactionList } = transactions;

  const sortedTransactions = userTransactionList?.transactions
    ? [...userTransactionList.transactions].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    : [];

  useEffect(() => {
    setLoader(true);
    dispatch(getTransactionsbyId({ id: userInfo._id, page: 1 })).then((res) => {
      console.log(res)
      setLoader(false);
    });
  }, []);

  return (
    <div className="px-3 py-2 profile-table" ref={ref}>
      <h2 className="mx-auto">Transactions </h2>
      <Table className="table edge-shadow" responsive>
        <thead>
          <tr>
            <th scope="col" className="text-center align-middle">
              Type
            </th>
            <th scope="col" className="text-center align-middle">
              Date
            </th>
            <th scope="col" className="text-center align-middle">
              Moyen de paiement
            </th>
            <th scope="col" className="text-center align-middle">
              Montant
            </th>
          </tr>
        </thead>
        {loader ? (
          <tbody>
            <tr>
              <td colSpan={4} className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </td>
            </tr>
          </tbody>
        ) : !sortedTransactions ? (
          <tbody>
            <tr>
              <td colSpan={4} className="text-center">
                Pas de paiments
              </td>
            </tr>
          </tbody>
        ) : sortedTransactions.length > 0 ? (
          <tbody>
            {sortedTransactions.map((elm) => {
              return (
                <tr key={elm._id}>
                  <th scope="row" className="text-center align-middle">
                    {elm.type}
                  </th>
                  <td className="text-center align-middle">
                    {format(new Date(elm.createdAt), "dd/MM/yyyy")}
                  </td>
                  <td className="text-center align-middle">{elm.service}</td>
                  <td className="text-center align-middle">{elm.montant} DT</td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={4} className="text-center">
                Pas de paiments
              </td>
            </tr>
          </tbody>
        )}
      </Table>
      <Pagination>
        <Pagination.First
          onClick={() => {
            dispatch(getTransactionsbyId({ id: userInfo._id, page: 1 }));
          }}
        />

        <Pagination.Prev
          onClick={() => {
            dispatch(
              getTransactionsbyId({
                id: userInfo._id,
                page:
                  userTransactionList?.page === 1
                    ? userTransactionList?.totalPages
                    : userTransactionList?.page - 1,
              })
            );
          }}
        />
        <Pagination.Item
          onClick={() => {
            dispatch(getTransactionsbyId({ id: userInfo._id, page: 1 }));
          }}
          active={userTransactionList?.page === 1 ? true : false}
        >
          {1}
        </Pagination.Item>
        {userTransactionList?.totalPages > 5 &&
          userTransactionList?.page > 3 && <Pagination.Ellipsis />}
        {userTransactionList?.totalPages === 3 && (
          <Pagination.Item
            onClick={() => {
              dispatch(getTransactionsbyId({ id: userInfo._id, page: 2 }));
            }}
            active={userTransactionList?.page === 2 ? true : false}
          >
            {2}
          </Pagination.Item>
        )}
        {userTransactionList?.totalPages > 4 &&
          [...Array(3).keys()]
            .map(
              (i) =>
                i +
                (userTransactionList?.page ===
                userTransactionList?.totalPages - 2
                  ? userTransactionList?.page - 2
                  : userTransactionList?.page ===
                    userTransactionList?.totalPages - 1
                  ? userTransactionList?.page - 3
                  : userTransactionList?.page ===
                    userTransactionList?.totalPages
                  ? userTransactionList?.page - 4
                  : userTransactionList?.page === 1
                  ? userTransactionList?.page
                  : userTransactionList?.page === 2 ||
                    userTransactionList?.page === 3
                  ? 1
                  : userTransactionList?.page - 2)
            )
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                    getTransactionsbyId({ id: userInfo._id, page: elm + 1 })
                  );
                }}
                active={userTransactionList?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {userTransactionList?.totalPages === 4 &&
          [...Array(2).keys()]
            .map((i) => i + 1)
            .map((elm) => (
              <Pagination.Item
                onClick={() => {
                  dispatch(
                    getTransactionsbyId({ id: userInfo._id, page: elm + 1 })
                  );
                }}
                active={userTransactionList?.page === elm + 1 ? true : false}
              >
                {elm + 1}
              </Pagination.Item>
            ))}
        {userTransactionList?.totalPages > 5 &&
          userTransactionList?.totalPages - 2 > userTransactionList?.page && (
            <Pagination.Ellipsis />
          )}
        {userTransactionList?.totalPages > 1 && (
          <Pagination.Item
            onClick={() => {
              dispatch(
                getTransactionsbyId({
                  id: userInfo._id,
                  page: userTransactionList?.totalPages,
                })
              );
            }}
            active={
              userTransactionList?.totalPages === userTransactionList?.page
                ? true
                : false
            }
          >
            {userTransactionList?.totalPages}
          </Pagination.Item>
        )}
        <Pagination.Next
          onClick={() => {
            dispatch(
              getTransactionsbyId({
                id: userInfo._id,
                page:
                  userTransactionList.page === userTransactionList?.totalPages
                    ? 1
                    : userTransactionList?.page + 1,
              })
            );
          }}
        />
        <Pagination.Last
          onClick={() => {
            dispatch(
              getTransactionsbyId({
                id: userInfo._id,
                page: userTransactionList?.totalPages,
              })
            );
          }}
        />
      </Pagination>
    </div>
  );
};

export default Transactions;
