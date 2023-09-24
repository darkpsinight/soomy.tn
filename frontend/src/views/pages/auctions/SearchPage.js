import React, { useEffect, useState} from "react";
import Footer from "../../../components/footer/Footer";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import Card from "../../../components/cards/Card";
import {useLocation} from "react-router-dom"

const Auctions = () => {
  const [products, setProducts] = useState();
  const [loader, setLoader] = useState(false);
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('search');
const userSearch = redirectInUrl ? redirectInUrl : '';
  useEffect(() => {
  if(userSearch) { setLoader(true);
    axios
      .get(`/rooms/getAuctionsSearch/${userSearch}`)
      .then((res) => {
        setLoader(false);
        setProducts(res.data);
      })
      .catch((err) => setLoader(false));}
  }, [userSearch]);


  return (
    <>
      
      <main className="container pt-2 px-lg-1 pb-5">
        <section className="search-title search-title-auction mb-4">
          <h1 className="mt-5 mb-2">{products?.length} Résulats pour {userSearch}</h1>
        
        </section>
    
        {loader ? (
          <Container
            fluid
            className="d-flex justify-content-center align-items-center"
          >
            <Spinner animation="border" className="mx-auto color-pink my-6" />
          </Container>
        ) : (
          <section className="mt-3 d-flex justify-content-start flex-wrap align-items-center px-lg-1 w-100 mx-auto pb-5" >
            {products
              ?.map((elm) => (
                <Card key={elm?._id} product={elm} variant="auction"/>
              ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Auctions;
