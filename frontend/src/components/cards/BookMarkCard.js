import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ConverterFull } from "./Converter";
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
      class={`card card-class bookmark-card`}
    
    >
      <div className="date-container">
        {" "}
        <p>
          <i className="fi fi-rr-time-fast icon"></i> Prévue le{" "}
          <b className="date">
            {format(new Date(props?.product?.startDate), "dd")}{" "}
            {ConverterFull(new Date(props?.product?.startDate))}
          </b>{" "}
          à{" "}
          <b className="time">
            {format(new Date(props?.product?.startDate), "HH:mm:00")}{" "}
          </b>
        </p>
      </div>
      <div className="img-container">
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
        <label for="participation">Salle d'enchère remplie à :</label>

        <div className="progress" id="participation">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${Math.floor(
                (participationNumber / props?.product?.capacity) * 100
              )}%`,
              ariaValuenow: `${Math.floor(
                (participationNumber / props?.product?.capacity) * 100
              )}`,
              ariaValuemin: "0",
              ariaValuemax: "100",
            }}
          >
            {Math.floor((participationNumber / props?.product?.capacity) * 100)}
            %
          </div>
        </div>

        {userParticipationList?.find(
          (elm) => elm.room?._id === props.product?._id
        ) ? (
          <button>
            <p>Voir Détails</p>
          </button>
        ) : (
          <button>
            <p> Participer à {props?.product?.participationPrice} DT </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
