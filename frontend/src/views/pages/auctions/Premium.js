import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer/Footer";
import Card from "../../../components/cards/Card";
import { Container, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTotalCategories } from "../../../redux/categorySlice";
import { getUser } from "../../../redux/userSlice";
import exclamation from "../../../assets/images/exclamation.png";
import axios from "axios";

const Premium = () => {
  const [products, setProducts] = useState();
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getTotalCategories());
  }, [dispatch]);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`/rooms/getPremiumAuctions`)
      .then((res) => {
        setLoader(false);
        setProducts(res.data);
        setShow(res.data.length === 0 ? true : false);
      })
      .catch((err) => setLoader(false));
  }, []);

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
      <main className="bg-premium main-premium pt-2 px-lg-0 pb-5">
        <section className="page-title page-title-premium mb-4">
          <h1>Enchères Premium</h1>
          <h3>Les meilleurs Deals pour les VIPs.</h3>
        </section>
        <section className="d-flex  justify-content-between mx-auto mt-2 mb-0 px-3 container auction-filter">
          <div className="d-flex justify-content-between filter-container">
            <label for="filter" className="mt-1 d-none d-lg-block me-2">
              Filtre:
            </label>
            <select
              className="form-select mb-2 me-1 border-none"
              aria-label="Default select example"
              id="filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Filtrer Par</option>
              <option value="populaire">Populaire</option>
              <option value="rentable">Rentable</option>
              <option value="selected">Choisi Par Soomy</option>
            </select>
          </div>
          <div className="d-flex justify-content-between filter-container">
            <label for="category" className="mt-1 d-none d-lg-block me-2">
              Categorie:
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
            className="d-flex justify-content-center align-items-center pb-2"
          >
            <Spinner animation="border" className="mx-auto color-pink my-6" />
          </Container>
        ) : show ? (
          <div className="card-etapes w-75 my-5">
            <img src={exclamation} />
            <h2 className="my-2">Pas d'enchères disponibles !</h2>
          </div>
        ) : (
          <section className="container mt-3 pb-5 d-flex justify-content-between flex-wrap align-items-center w-100 mx-auto px-lg-1">
            {products
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
                  <Card key={elm?._id} product={elm} variant="auction" />
                ) : (
                  <div
                    key={`empty-${index}`}
                    className="card card-class auction-card"
                    style={{
                      width: emptyCardWidth,
                      flexBasis: emptyCardWidth,
                      visibility: "hidden",
                      display: "none",
                      backgroundColor: "#160006",
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
                    backgroundColor: "#160006",
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

export default Premium;
