import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer/Footer";
import FinishedCard from "../../../components/cards/FinishedCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTotalCategories } from "../../../redux/categorySlice";
import { Container, Spinner } from "react-bootstrap";
import { getUser } from "../../../redux/userSlice";
import exclamation from "../../../assets/images/exclamation.png";

const Finished = () => {
  const [products, setProducts] = useState();
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`/rooms/getFinishedAuctions/${30}`)
      .then((res) => {
        setLoader(false);
        setProducts(res.data);
        setShow(res.data.length === 0 ? true : false);
      })
      .catch((err) => setLoader(false));
  }, []);

  const getAuctions = (e) => {
    setLoader(true);
    axios
      .get(`/rooms/getFinishedAuctions/${e.target.value}`)
      .then((res) => {
        setLoader(false);
        setProducts(res.data);
        setShow(res.data.length === 0 ? true : false);
      })
      .catch((err) => setLoader(false));
  };

  useEffect(() => {
    dispatch(getTotalCategories());
  }, [dispatch]);

  const categorie = useSelector((state) => state.category);
  const { totalCategoryList } = categorie;

  // adjust the layout behavior of the screen width on 1382 or more
  const isWideScreen = window.innerWidth >= 1382;

  let productsToRender = [];
  if (Array.isArray(products)) {
    productsToRender = [...products];

    // Add empty products to fill the line
    if (isWideScreen) {
      const remainingCards = 4 - (productsToRender.length % 4);
      for (let i = 0; i < remainingCards; i++) {
        productsToRender.push(null);
      }
    }
  }

  const emptyCardWidth = `${100 / 4}%`; // Equal width for all empty cards

  const isSecondLineWithTwoCards = isWideScreen && productsToRender.length >= 6;

  // Calculate the number of empty cards needed to complete the last row
  const remainingEmptyCards = 4 - (productsToRender.length % 4);

  // detect screen's width 583px or less to fix padding bottom of empty cards bug
  const isSmallScreen = window.innerWidth <= 583;

  return (
    <div>
      <main className="container pt-2 px-lg-0 pb-1">
        <section className="page-title page-title-auction mb-4">
          <h1>Enchères Terminés</h1>
          <h3>Découvrez les dernières enchères remportées.</h3>
        </section>
        <section className="d-flex justify-content-between my-3 px-3 auction-filter">
          <div className="d-flex justify-content-between filter-container">
            <label for="filter" className="mt-1 d-none d-lg-block me-2 ">
              Filtrer par :
            </label>
            <select
              className="form-select mb-2"
              aria-label="Default select example"
              id="filter"
              onChange={(e) => {
                getAuctions(e);
              }}
            >
              <option value="30">dernier 30 Jours</option>
              <option value="7">dernier 7 Jours</option>
              <option value="3">dernier 3 Jours</option>
            </select>
          </div>
          <div className="d-flex justify-content-between filter-container">
            <label for="category" className="mt-1 d-none d-lg-block me-2">
              Catégorie
            </label>
            <select
              className="form-select mb-2 me-1 border-none"
              aria-label="Default select example"
              id="filter"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Choisir Categorie</option>
              {totalCategoryList
                ? totalCategoryList?.categories?.map((elm) => (
                    <option value={elm._id}>{elm.name}</option>
                  ))
                : null}
            </select>
          </div>
        </section>
        {loader ? (
          <Container
            fluid
            className="d-flex justify-content-center align-items-center"
          >
            <Spinner animation="border" className="mx-auto color-pink my-6" />
          </Container>
        ) : show ? (
          <div className="card-etapes w-75 my-5">
            <img src={exclamation} />
            <h2 className="my-2">Pas d'enchères disponibles !</h2>
          </div>
        ) : (
          <section
            className={`mt-3 d-flex ${
              isWideScreen ? "justify-content-between" : "justify-content-start"
            } flex-wrap align-items-start px-lg-1 w-100 mx-auto ${
              isSecondLineWithTwoCards ? "second-line-two-cards" : ""
            }`}
            style={{
              flexWrap: isWideScreen ? "wrap" : "nowrap",
            }}
          >
            {productsToRender
              ?.filter((elm) =>
                filter === "all"
                  ? true
                  : filter === "rentable"
                  ? elm.privilege === "rentable"
                  : filter === "selected"
                  ? elm.privilege === "selected"
                  : filter === "populaire"
                  ? elm.privilege === "populaire"
                  : true
              )
              ?.filter((elm) =>
                category === "all"
                  ? true
                  : elm?.product?.category?._id === category
              )
              ?.map((elm, index) =>
                elm ? (
                  <FinishedCard key={elm?._id} product={elm} variant="auction" />
                ) : (
                  <div
                    key={`empty-${index}`}
                    className="card card-class auction-card"
                    style={{
                      width: emptyCardWidth,
                      flexBasis: emptyCardWidth,
                      visibility: "hidden",
                      display: "none",
                    }}
                  ></div>
                )
              )}

            {/* Add remaining empty cards for the last row */}
            {remainingEmptyCards > 0 &&
              Array.from({ length: remainingEmptyCards }).map((_, index) => (
                <div
                  key={`remaining-empty-${index}`}
                  className="card card-class auction-card"
                  style={{
                    width: emptyCardWidth,
                    flexBasis: emptyCardWidth,
                    visibility: isSmallScreen ? "hidden" : "hidden",
                    display: isSmallScreen ? "none" : "block",
                  }}
                ></div>
              ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Finished;
