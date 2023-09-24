import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ConverterFull,Converter } from "./Converter";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import axios from "axios";
const Card = (props) => {
 
  const [participationNumber, setParticipation] = useState(0);

  useEffect(() => {
    axios
      .get(`/participations/getNumberOfParticipations/${props.product?._id}`)
      .then((res) => setParticipation(res.data));
  }, [props]);

  const participation = useSelector((state) => state.participation);
  const { userParticipationList } = participation;
  return (
    <div
      class={`card card-class ${props.variant==="home"?"home-card":"auction-card"}`}
    
    >
          <Link
        to={`${
          props.product?.roomCategory === "premium"
            ? "/premiumProduct/" + props.product?._id.toString()
            : "/product/" + props?.product?._id.toString()
        }`}
      >
      <div className="img-container mt-3">
        <img
          className="brand-img"
          src={props?.product?.product?.brand?.logo?.imageURL}
        />
        <img
          src={props?.product?.product?.image?.imageURL}
          className="img-produit"
          alt="product"
        />
        <h3>{props?.product?.product?.title}</h3>
      </div>
      <div class="text-container pb-2">
        <p>
          <span className="bold-price">{props?.product?.product?.prix}</span>DT
          {props?.product?.product?.partner ? (
            <>
              <span className="bold-price">chez</span>
              <img
                src={props?.product?.product?.partner?.image?.imageURL}
                alt="partner"
                className="partner-logo"
              />
            </>
          ) : null}
        </p>
        
        <div className="d-flex align-items-end justify-content-evenly w-100 px-4 pb-2">
            <div
              className="date-finished w-25"
             
            >
              <h3>{format(new Date(props?.product?.endDate), "dd")}</h3>
              <p>{Converter(new Date(props?.product?.endDate))} </p>
              <p> {format(new Date(props?.product?.endDate), "HH:mm")}</p>
            </div>
            <button><p>Voir Détails</p></button>
          </div>
      </div>
      </Link>
    </div>
  );
};

export default Card;

