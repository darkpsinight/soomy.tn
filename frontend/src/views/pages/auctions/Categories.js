import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import exclamation from "../../../assets/images/exclamation.png";
import axios from "axios";
import Card from "../../../components/cards/Card";
import { useParams } from "react-router-dom";
import { getUser } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { Container, Spinner } from "react-bootstrap";
const Auctions = () => {
  const [products, setProducts] = useState();
  const [categoryName, setCategoryname] = useState();
  const [categoryId, setCategoryId] = useState();
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const category = params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
    if (category) {
      setLoader(true);
      axios
        .get(`/categories/getCategoryByName/${category}`)
        .then((response) => {
          setCategoryname(response.data.name);
          setCategoryId(response.data._id);
          return axios.get(`/rooms/getAuctionsByCategory/${response?.data?._id}`);
        })
        .then((res) => {
          
          if(res?.data?.length===0){
            setShow(true)
          }
          else {setProducts(res.data);}
          setLoader(false);
        })

        .catch((error) => setShow(true), setLoader(false));
    }
  }, [category, categoryId]);

  return (
    <>
      <main className="container pt-2 px-lg-0 pb-1">
        <section className="page-title page-title-auction mb-4">
          {categoryName ? <h1>{categoryName}</h1> : null}
        </section>
        {loader ? (
          <Container
            fluid
            className="d-flex justify-content-center align-items-center"
          >
            <Spinner animation="border" className="mx-auto color-pink my-6" />
          </Container>
        ) : !show ? (
          <section className="mt-3 d-flex justify-content-start flex-wrap align-items-center w-100 mx-auto px-lg-1">
            {products?.map((elm) => (
              <Card key={elm?._id} product={elm} variant="auction" />
            ))}
          </section>
        ) : (
          <div className="card-etapes w-75 mt-5">
            <img src={exclamation} />
            <h2 className="my-2">
              Pas d'enchères disponibles pour cette catégorie !
            </h2>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Auctions;
