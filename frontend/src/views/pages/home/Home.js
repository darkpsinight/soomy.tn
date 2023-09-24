import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import image1 from "../../../assets/images/slider_imgs_home/enchere-soomy-slider-intro-final.jpg";
/* import image2 from "../../../assets/images/slider_imgs_home/enchere-soomy-slider-1.jpg";
import image3 from "../../../assets/images/slider_imgs_home/enchere-soomy-slider-2.jpg";
import image4 from "../../../assets/images/slider_imgs_home/enchere-soomy-slider-3.jpg";
import image5 from "../../../assets/images/slider_imgs_home/enchere-soomy-slider-4.jpg"; */
import image6 from "../../../assets/images/slider_imgs_home/enchere-soomy-slider-comment-jouer.jpg";
import bgHomeMobile from "../../../assets/images/slider-mobile.jpg";
import avatar from "../../../assets/images/avatar.jpg";
import Footer from "../../../components/footer/Footer";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import CarouselMulti from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import energy from "../../../assets/images/energy.png";
import clothesHanger from "../../../assets/images/clothes-hanger.png";
import hammer from "../../../assets/images/hammer.png";
import quote from "../../../assets/images/quote.png";
import Card from "../../../components/cards/Card";
import CustomRightArrow from "../../../components/CustomRightArrow";
import CustomLeftArrow from "../../../components/CustomLeftArrow";
import { ReactComponent as YourSvg } from "../../../assets/images/hammer.svg";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { getUser, setCloseModal } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";

import CarouselPackCard from "../../../components/cards/carouselPackCard/CarouselPackCard.js";
import Aos from "aos";
import "aos/dist/aos.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1500, min: 1100 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 1100, min: 550 },
    items: 2,
  },
  smallmobile: {
    breakpoint: { max: 550, min: 0 },
    items: 1,
  },
};
const Home = (props) => {
  const [selectedModified, setSelectedModified] = useState([]);
  const [rentableModified, setRentableModified] = useState([]);
  const [premiumModified, setPremiumModified] = useState([]);
  const [widthInner, setWidthInner] = useState(window.innerWidth);
  const [widthCard, setWidthCard] = useState();
  const images = [image1, /* image2, image3, image4, image5, */ image6];
  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidthInner(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);
  const refCarousel = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCloseModal());
  }, []);

  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidthInner(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);
  useEffect(() => {
    axios.get(`/rooms/getPremiumAuctions`).then((res) => {
      setPremiumModified(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/rooms/getPrivilegedAuctions/selected`).then((res) => {
      setSelectedModified(res.data);

      Aos.init({});
    });
    return;
  }, []);
  useEffect(() => {
    axios.get(`/rooms/getPrivilegedAuctions/rentable`).then((res) => {
      setRentableModified(res.data);
    });
    return;
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <Container className="p-0" fluid>
      <main className="container-fluid mx-0 px-0 home-main">
        <section className="home-section">
          <Carousel variant="dark" interval={null} className="home-slide">
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={widthInner > 991 ? image : bgHomeMobile}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="animation-wrapper">
            <div
              data-aos-offset="0"
              data-aos="fade-down"
              data-aos-once={true}
              data-aos-duration="1000"
              data-aos-delay="500"
              className="instruction-wrapper d-lg-flex flex-column justify-content-center align-items-center d-none "
            >
              <div className="instructions mx-auto">
                {" "}
                <div className="page-title">
                  <h4>
                    <span className="color-pink">Etapes</span> de participations
                  </h4>
                </div>
                <div className="d-flex justify-content-evenly">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <i className="fi fi-rr-user-add"></i>
                    <p>
                      <span>1</span>.Inscription
                    </p>
                    <div className="instruction-description">
                      <p className="mx-4">Inscrivez vous en deux clics sur </p>
                      <p>soomy.tn. C'est gratuit et rapide à la fois</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src={hammer} />
                    <p>
                      <span>2</span>.Rejoindre une enchère
                    </p>
                    <div className="instruction-description">
                      <p className="mx-4">
                        Participez à une enchère en ligne,{" "}
                      </p>
                      <p>et gagnez jusqu'à 30 Bitso de crédit Bonus. </p>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center  ms-2">
                    <i className="fi fi-rr-time-fast"></i>
                    <p>
                      <span>3</span>.Restez Informé
                    </p>
                    <div className="instruction-description">
                      <p className="mx-4">Nous vous informons à l'avance </p>
                      <p>par email ou SMS, du démarrage de votre enchère</p>
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <i className="fi fi-rr-bullseye-pointer"></i>
                    <p>
                      <span>4</span>.Participé aux enchère
                    </p>
                    <div className="instruction-description">
                      <p className="mx-4">
                        À vous de jouer ! il ne vous reste{" "}
                      </p>
                      <p> qu'à miser et remporter votre enchère</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="mx-auto button-detail">
                <Link to={"/instructions"}>
                  en savoir plus <i className="fi fi-rr-angle-right"></i>
                </Link>
              </button>
            </div>
          </div>
          <div className="page-title d-lg-none">
            <h4>Etapes de participations</h4>
          </div>
          <Accordion className="mt-4 d-lg-none" defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <i className="fi fi-rr-user-add"></i> Inscription
              </Accordion.Header>
              <Accordion.Body>
                <strong>
                  Inscrivez vous en deux clics sur soomy.tn. C'est gratuit et
                  rapide à la fois.
                </strong>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <YourSvg /> Rejoindre une enchère
              </Accordion.Header>
              <Accordion.Body>
                <strong>
                  Participez à une enchère en ligne, et gagnez jusqu'à 30 Bitsou
                  de crédit Bonus.{" "}
                </strong>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <i className="fi fi-rr-time-fast"></i> Restez Informés
              </Accordion.Header>
              <Accordion.Body>
                <strong>
                  Nous vous informons à l'avance, par un E-mail ou SMS, du
                  démarrage de votre enchère
                </strong>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <i className="fi fi-rr-bullseye-pointer"></i> Participez aux
                enchères
              </Accordion.Header>
              <Accordion.Body>
                <strong>
                  À vous de jouer! Il ne vous reste qu'à miser et remporter
                  votre enchère
                </strong>
              </Accordion.Body>
            </Accordion.Item>
            <button className="button-detail mx-auto">
              <Link to={"/instructions"}>
                {" "}
                en savoir plus <i className="fi fi-rr-angle-right"></i>{" "}
              </Link>
            </button>
          </Accordion>
        </section>

        {selectedModified?.length > 0 ? (
          <section className="home-section product-section">
            <h1>Nouveautés</h1>
            <div className="container" ref={refCarousel}>
              <CarouselMulti
                swipeable={true}
                slidesToSlide={1}
                autoPlay={false}
                ssr={false}
                draggable={true}
                showDots={false}
                responsive={responsive}
                infinite={false}
                deviceType={props.deviceType}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                renderDotsOutside={false}
                shouldResetAutoplay={false}
              >
                {selectedModified
                  ? selectedModified.map((elm) => (
                      <Card variant="home" key={elm._id} product={elm} />
                    ))
                  : null}
              </CarouselMulti>
            </div>
          </section>
        ) : null}
        {rentableModified?.length > 0 ? (
          <section className="home-section product-section">
            <h1>Deals du mois</h1>
            <div className="container" ref={refCarousel}>
              <CarouselMulti
                swipeable={true}
                slidesToSlide={1}
                autoPlay={false}
                ssr={false}
                draggable={true}
                showDots={false}
                responsive={responsive}
                infinite={false}
                deviceType={props.deviceType}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                renderDotsOutside={false}
                shouldResetAutoplay={false}
              >
                {rentableModified
                  ? rentableModified.map((elm) => (
                      <Card variant="home" key={elm._id} product={elm} />
                    ))
                  : null}
              </CarouselMulti>
            </div>
          </section>
        ) : null}
        {premiumModified?.length > 0 ? (
          <section className="home-section premium-section">
            <h1>enchères premium</h1>
            <div className="container" ref={refCarousel}>
              <CarouselMulti
                swipeable={true}
                slidesToSlide={1}
                autoPlay={false}
                ssr={false}
                draggable={true}
                showDots={false}
                responsive={responsive}
                infinite={false}
                deviceType={props.deviceType}
                customRightArrow={<CustomRightArrow variant="premium" />}
                customLeftArrow={<CustomLeftArrow variant="premium" />}
                renderDotsOutside={false}
                shouldResetAutoplay={false}
              >
                {premiumModified
                  ? premiumModified.map((elm) => (
                      <Card variant="home" key={elm._id} product={elm} />
                    ))
                  : null}
              </CarouselMulti>
            </div>
          </section>
        ) : null}
        <section className="home-section testimonial-section px-lg-5">
          <h1>Packs disponibles</h1>
        </section>
        <CarouselPackCard />
      </main>
      <Footer />
    </Container>
  );
};

export default Home;
