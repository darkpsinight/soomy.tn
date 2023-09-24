import React, { useState, useEffect ,useRef} from "react";
import { setCloseModal } from "../../../redux/userSlice";
import {
  fetchRoomWinnerPagination,
} from "../../../redux/roomSlice";

import {
  fetchUserParticipation,
} from "../../../redux/participationSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/cards/Card";
import FinishedCard from "../../../components/cards/FinishedBookmarkCard";
import Pagination from "react-bootstrap/Pagination";
import Alert from "@mui/material/Alert";

const Auctions = () => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(true);
  const [won, setWon] = useState(false);
  const [live, setLive] = useState(false);
  const [favoris, setFavoris] = useState(false);
  const [pendingPage, setPendingPage] = useState(0);
  const [enablePage, setEnablePage] = useState(0);
  const [favorisPage, setFavorisPage] = useState(0);
  const user = useSelector((state) => state.user);
  const { userInfo} = user;
  const participation = useSelector((state) => state.participation);
  const { userParticipationList } = participation;
  const room = useSelector((state) => state.room);
  const { RoomWinnerPagination } = room;
 const ref = useRef(null)
 useEffect(()=>{
  if(ref?.current){ref.current.scrollIntoView({ block: "center" });}
 },[ref])
  useEffect(() => {
    dispatch(setCloseModal());
  }, []);
  useEffect(() => {
    dispatch(fetchUserParticipation(userInfo._id));
  }, [userInfo]);
  
  let bookmarks = [...userInfo?.bookmarks];
  let sortedFavoris = bookmarks?.sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
 
  return (
    <div className="px-lg-3 py-2" ref={ref}>
      <h2 className="mx-auto">Mes Enchères </h2>
      <ul className="selector-profile">
        <li
          className={`${pending && "active"}`}
          onClick={() => {
            setPending(true);
            setWon(false);
            setLive(false);
            setFavoris(false);
            dispatch(fetchUserParticipation(userInfo._id));
          }}
        >
          En attents
        </li>
        <li
          className={`${live && "active"}`}
          onClick={() => {
            setPending(false);
            setWon(false);
            setLive(true);
            setFavoris(false);
            dispatch(fetchUserParticipation(userInfo._id));
          }}
        >
          En cours
        </li>
        <li
          className={`${won && "active"}`}
          onClick={() => {
            setPending(false);
            setWon(true);
            setLive(false);
            setFavoris(false);
            dispatch(
              fetchRoomWinnerPagination({
                id: userInfo._id,
                page: 1,
              })
            );
          }}
        >
          Gagnées{" "}
        </li>
        <li
          className={`${favoris && "active"}`}
          onClick={() => {
            setPending(false);
            setWon(false);
            setLive(false);
            setFavoris(true);
          }}
        >
          Favoris
        </li>
      </ul>
      <div className="bookmark-inner">
        {pending
          ? userParticipationList
              ?.filter((elm) => elm?.room?.status === "pending")
              ?.slice(pendingPage * 6, pendingPage * 6 + 6)
              ?.map((elm) => <Card key={elm?._id}  product={elm.room} />)
          : live
          ? userParticipationList
              ?.filter((elm) => elm?.room?.status === "enable")
              ?.slice(enablePage * 6, enablePage * 6 + 6)
              ?.map((elm) => <Card key={elm?._id}  product={elm.room} />)
          : won
          ? RoomWinnerPagination?.rooms?.map((elm) => <FinishedCard key={elm?._id}  product={elm} />)
          : favoris
          ? sortedFavoris?.slice(favorisPage * 6, favorisPage * 6 + 6)?.map((elm) => <Card key={elm?._id}  product={elm} />)
          : null}
      </div>
      <div className="bookmark-inner">
        {pending
          && userParticipationList?.filter((elm) => elm?.room?.status === "pending")?.length===0?
          <Alert severity="error" className="w-100 my-5">
          Pas d'enchères en attente
        </Alert>
          : live
          && userParticipationList?.filter((elm) => elm?.room?.status === "enable")?.length===0?
          <Alert severity="error" className="w-100 my-5">
         Pas d'enchères en cours
        </Alert>
          : won
          && RoomWinnerPagination?.rooms?.length===0?
          <Alert severity="error" className="w-100 my-5">
          Pas d'enchères gangnées
        </Alert>
          : favoris
          && sortedFavoris?.length===0?<Alert severity="error" className="w-100 my-5">
         Pas de favoris
        </Alert>
          : null}
      </div>
      {pending ? (
        
        <Pagination style={{ justifyContent: "center" }}>
          <Pagination.First
            onClick={() => {
              setPendingPage(0);
            }}
          />
          <Pagination.Prev
            onClick={() => {
              pendingPage == 0
                ? setPendingPage(
                    Math.floor(
                      userParticipationList?.filter(
                        (elm) => elm?.room?.status === "pending"
                      )?.length / 6
                    )
                  )
                : setPendingPage(pendingPage - 1);
            }}
          />
          {[
            ...Array(
              Math.ceil(
                userParticipationList?.filter(
                  (elm) => elm?.room?.status === "pending"
                )?.length
                  ? userParticipationList?.filter(
                      (elm) => elm?.room?.status === "pending"
                    ).length / 6
                  : 1
              )
            ).keys(),
          ].map((elm) => (
            <Pagination.Item
              onClick={() => {
                setPendingPage(elm);
              }}
              active={RoomWinnerPagination?.page === elm + 1 ? true : false}
            >
              {elm + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => {
              pendingPage ===
              Math.floor(
                userParticipationList?.filter(
                  (elm) => elm?.room?.status === "pending"
                )?.length / 6
              )
                ? setPendingPage(0)
                : setPendingPage(pendingPage + 1);
            }}
          />
          <Pagination.Last
            onClick={() => {
              setPendingPage(
                Math.floor(
                  userParticipationList?.filter(
                    (elm) => elm?.room?.status === "pending"
                  )?.length / 6
                )
              );
            }}
          />
        </Pagination>
      ) : null}
      {live ? (
        <Pagination style={{ justifyContent: "center" }}>
          <Pagination.First
            onClick={() => {
              setEnablePage(0);
            }}
          />
          <Pagination.Prev
            onClick={() => {
              enablePage == 0
                ? setEnablePage(
                    Math.floor(
                      userParticipationList?.filter(
                        (elm) => elm?.room?.status === "enable"
                      )?.length / 6
                    )
                  )
                : setEnablePage(enablePage - 1);
            }}
          />
          {[
            ...Array(
              Math.ceil(
                userParticipationList?.filter(
                  (elm) => elm?.room?.status === "enable"
                )?.length
                  ? userParticipationList?.filter(
                      (elm) => elm?.room?.status === "enable"
                    )?.length / 6
                  : 1
              )
            ).keys(),
          ].map((elm) => (
            <Pagination.Item
              onClick={() => {
                setEnablePage(elm);
              }}
              active={RoomWinnerPagination?.page === elm + 1 ? true : false}
            >
              {elm + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => {
              enablePage ===
              Math.floor(
                userParticipationList?.filter(
                  (elm) => elm?.room?.status === "enable"
                )?.length / 6
              )
                ? setEnablePage(0)
                : setEnablePage(enablePage + 1);
            }}
          />
          <Pagination.Last
            onClick={() => {
              setEnablePage(
                Math.floor(
                  userParticipationList?.filter(
                    (elm) => elm?.room?.status === "enable"
                  )?.length / 6
                )
              );
            }}
          />
        </Pagination>
      ) : null}
      {won ? (
         <Pagination>
         <Pagination.First
           onClick={() => {
             dispatch(fetchRoomWinnerPagination({ id: userInfo._id, page: 1 }));
           }}
         />
 
         <Pagination.Prev
           onClick={() => {
             dispatch(
               fetchRoomWinnerPagination({
                 id: userInfo._id,
                 page:
                   RoomWinnerPagination?.page === 1
                     ? RoomWinnerPagination?.totalPages
                     : RoomWinnerPagination?.page - 1,
               })
             );
           }}
         />
         <Pagination.Item
           onClick={() => {
             dispatch(fetchRoomWinnerPagination({ id: userInfo._id, page: 1 }));
           }}
           active={RoomWinnerPagination?.page === 1 ? true : false}
         >
           {1}
         </Pagination.Item>
         {RoomWinnerPagination?.totalPages > 5 &&
           RoomWinnerPagination?.page > 3 && <Pagination.Ellipsis />}
         {RoomWinnerPagination?.totalPages === 3 && (
           <Pagination.Item
             onClick={() => {
               dispatch(fetchRoomWinnerPagination({ id: userInfo._id, page: 2 }));
             }}
             active={RoomWinnerPagination?.page === 2 ? true : false}
           >
             {2}
           </Pagination.Item>
         )}
         {RoomWinnerPagination?.totalPages > 4 &&
           [...Array(3).keys()]
             .map(
               (i) =>
                 i +
                 (RoomWinnerPagination?.page ===
                 RoomWinnerPagination?.totalPages - 2
                   ? RoomWinnerPagination?.page - 2
                   : RoomWinnerPagination?.page ===
                     RoomWinnerPagination?.totalPages - 1
                   ? RoomWinnerPagination?.page - 3
                   : RoomWinnerPagination?.page ===
                     RoomWinnerPagination?.totalPages
                   ? RoomWinnerPagination?.page - 4
                   : RoomWinnerPagination?.page === 1
                   ? RoomWinnerPagination?.page
                   : RoomWinnerPagination?.page === 2 ||
                     RoomWinnerPagination?.page === 3
                   ? 1
                   : RoomWinnerPagination?.page - 2)
             )
             .map((elm) => (
               <Pagination.Item
                 onClick={() => {
                   dispatch(
                     fetchRoomWinnerPagination({ id: userInfo._id, page: elm + 1 })
                   );
                 }}
                 active={RoomWinnerPagination?.page === elm + 1 ? true : false}
               >
                 {elm + 1}
               </Pagination.Item>
             ))}
         {RoomWinnerPagination?.totalPages === 4 &&
           [...Array(2).keys()]
             .map(
               (i) =>
                 i + 1
                
             )
             .map((elm) => (
               <Pagination.Item
                 onClick={() => {
                   dispatch(
                     fetchRoomWinnerPagination({ id: userInfo._id, page: elm + 1 })
                   );
                 }}
                 active={RoomWinnerPagination?.page === elm + 1 ? true : false}
               >
                 {elm + 1}
               </Pagination.Item>
             ))}
         {RoomWinnerPagination?.totalPages > 5 &&
           RoomWinnerPagination?.totalPages - 2 > RoomWinnerPagination?.page && (
             <Pagination.Ellipsis />
           )}
         {
           (RoomWinnerPagination?.totalPages > 1 && (
             <Pagination.Item
               onClick={() => {
                 dispatch(
                   fetchRoomWinnerPagination({
                     id: userInfo._id,
                     page: RoomWinnerPagination?.totalPages,
                   })
                 );
               }}
               active={
                 RoomWinnerPagination?.totalPages === RoomWinnerPagination?.page
                   ? true
                   : false
               }
             >
               {RoomWinnerPagination?.totalPages}
             </Pagination.Item>
           ))}
         <Pagination.Next
           onClick={() => {
             dispatch(
               fetchRoomWinnerPagination({
                 id: userInfo._id,
                 page:
                   RoomWinnerPagination.page === RoomWinnerPagination?.totalPages
                     ? 1
                     : RoomWinnerPagination?.page + 1,
               })
             );
           }}
         />
         <Pagination.Last
           onClick={() => {
             dispatch(
               fetchRoomWinnerPagination({
                 id: userInfo._id,
                 page: RoomWinnerPagination?.totalPages,
               })
             );
           }}
         />
       </Pagination>
        
       
      ) : null}
      {favoris ? (
        <Pagination style={{ justifyContent: "center" }}>
          <Pagination.First
            onClick={() => {
              setFavorisPage(0);
            }}
          />
          <Pagination.Prev
             onClick={() => {
              favorisPage == 0
                ? setFavorisPage(
                    Math.floor(
                      userInfo?.bookmarks?.length / 6
                    )
                  )
                : setFavorisPage(favorisPage - 1);
            }}
          />
          {[
            ...Array(
              Math.ceil(
                userInfo?.bookmarks?.length / 6
                  ? userInfo?.bookmarks?.length / 6
                  : 1
              )
            ).keys(),
          ].map((elm) => (
            <Pagination.Item
              onClick={() => {
                setFavorisPage(elm);
              }}
              active={RoomWinnerPagination?.page === elm + 1 ? true : false}
            >
              {elm + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
             onClick={() => {
              favorisPage ===
              Math.floor(
                userInfo?.bookmarks?.length / 6
              )
                ? setFavorisPage(0)
                : setFavorisPage(enablePage + 1);
            }}
          />
          <Pagination.Last
            onClick={() => {
              setFavorisPage(Math.floor(userInfo?.bookmarks?.length / 6));
            }}
          />
        </Pagination>
      ) : null}
    </div>
  );
};

export default Auctions;
