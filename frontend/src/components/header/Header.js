import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import energy from "../../assets/images/energy.png";
import avatar from "../../assets/images/avatar.jpg";
import logo from "../../assets/images/Asset 1soomy.png";
import logoMobile from "../../assets/images/Asset 4soomy.png";
import clothesHanger from "../../assets/images/clothes-hanger.png";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { logout, setShowModalCredit } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { handleClose, handleShow } from "../../redux/dashboardSlice";
import { Button } from "primereact/button";
import Toast from "react-bootstrap/Toast";
import coins from "../../assets/images/Layer_40.png";
import { Tooltip } from "primereact/tooltip";
import CircularProgress from "@mui/material/CircularProgress";

const Header = ({ montant }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [showA, setShowA] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const user = useSelector((state) => state.user);
  const packUse = useSelector((state) => state.packUse);
  const { isAuth, userInfo, loading } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const participation = useSelector((state) => state.participation);
  const { userParticipationList, freeCredit } = participation;
  const { auction } = useSelector((state) => state.room);
  const purchase = useSelector((state) => state.purchase);
  const { purchasedPacks, updateLoading } = purchase;

  // Find the selected purchased pack in purchasedPacks
  const selectedPurchasedPack = purchasedPacks?.packPurchases?.find(
    (packPurchase) =>
      packPurchase._id === packUse?.packUse?.selectedPurchasedPack_Id
  );

  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);
  const currentLocation = useLocation().pathname;
  const locationTestCategoryBar =
    currentLocation.toLowerCase() === "/auction" ||
    currentLocation.toLowerCase() === "/premium" ||
    currentLocation.toLowerCase() === "/finished" ||
    currentLocation.toLowerCase().slice(0, 8) === "/product" ||
    currentLocation.toLowerCase().slice(0, 15) === "/premiumproduct" ||
    currentLocation.toLowerCase().slice(0, 9) === "/category" ||
    currentLocation.toLowerCase().slice(0, 11) === "/validation" ||
    currentLocation.toLowerCase().slice(0, 9) === "/checkout" ||
    currentLocation.toLowerCase() === "/signin" ||
    currentLocation.toLowerCase() === "/register" ||
    currentLocation.toLowerCase() === "/instructions" ||
    currentLocation.toLowerCase() === "/faq" ||
    currentLocation.toLowerCase().slice(0, 8) === "/profile" ||
    currentLocation.toLowerCase() === "/mentions" ||
    currentLocation.toLowerCase().slice(0, 6) === "/reset" ||
    currentLocation.toLowerCase().slice(0, 7) === "/search" ||
    currentLocation.toLowerCase().slice(0, 9) === "/validate" ||
    currentLocation.toLowerCase().slice(0, 11) === "/conditions" ||
    currentLocation.toLowerCase() === "/phone";

  const locationTestHeader =
    currentLocation.toLowerCase().slice(0, 10) === "/dashboard";

  // image load in tooltip
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (expanded && !event.target.closest(".navbar")) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [expanded]);

  return (
    <>
      {!locationTestHeader ? (
        <Navbar
          expand="lg"
          className={`fixed-top flex-column p-0 edge-shadow`}
          expanded={expanded}
        >
          <Toast
            show={showA}
            onClose={toggleShowA}
            style={{ borderRadius: "0" }}
            className="d-lg-none w-100"
          >
            <Toast.Header className="py-0 ">
              <Container
                fluid
                className="d-flex justify-content-center align-items-center bg-white d-lg-none flex-column promo-nav"
              >
                <p>
                  Gagnez jusqu'à <b>30</b> Bitso Bonus sur chaque nouvelle
                  participation à une enchère
                </p>
                <b>bienvenue</b>
              </Container>
            </Toast.Header>
          </Toast>

          <Container
            fluid
            className="d-lg-flex justify-content-between bg-info-black px-5 py-2 d-none"
          >
            <div className="d-flex mx-2">
              <span className="mx-2 d-flex align-items-center">
                <i className="fi fi-rr-envelope me-2 mt-1"></i>
                <p className="m-0">contact@soomy.com</p>
              </span>
              <span className="mx-2 d-flex align-items-center">
                <i className="fi fi-rr-phone-call me-2 mt-1"></i>
                <p className="m-0">50100140</p>
              </span>
            </div>
            <div className="d-flex mx-2">
              <i
                className="fi fi-rr-search hover-icon mx-2 mt-1"
                onClick={() => dispatch(handleShow())}
              ></i>
              <i className="fi fi-brands-instagram hover-icon mx-2 mt-1"></i>
              <i className="fi fi-brands-facebook hover-icon mx-2 mt-1"></i>
            </div>
          </Container>
          <Container
            fluid
            className={`background-white bg-nav-black py-3 py-lg-1 px-lg-5`}
          >
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className={`navbar-toggler first-button ${expanded && "open"}`}
              type="button"
              onClick={() => {
                setExpanded((prevExpanded) => !prevExpanded);
              }}
            >
              <div className="animated-icon1">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Navbar.Toggle>
            <Link to={"/"} className="flex-1 my-lg-3 flex-2-logo">
              <Navbar.Brand>
                {width > 991 ? (
                  <img src={logo} alt="logo" />
                ) : (
                  <img src={logoMobile} alt="logo" />
                )}
              </Navbar.Brand>
            </Link>

            <Navbar.Collapse
              className="flex-5 px-4 order-4"
              id="basic-navbar-nav"
            >
              <Nav className="me-auto navbar-nav justify-content-lg-evenly justify-content-md-center justify-content-sm-center align-items-center w-100 me-auto mb-2 mb-lg-0">
                <li className="nav-item nav-item-home">
                  <NavLink
                    className={`nav-link ${
                      currentLocation.slice(0, 8) === "/product"
                        ? "active"
                        : null
                    }`}
                    to={"/auction"}
                    onClick={() => setExpanded(false)}
                  >
                    Enchère Soomy
                  </NavLink>
                </li>
                <li className="nav-item nav-item-home">
                  <NavLink
                    className="nav-link"
                    to={"/finished"}
                    onClick={() => setExpanded(false)}
                  >
                    Enchère Terminée
                  </NavLink>
                </li>
                <li className="nav-item nav-item-home">
                  <NavLink
                    className={`nav-link ${
                      currentLocation.slice(0, 15) === "/premiumProduct"
                        ? "active"
                        : null
                    }`}
                    to={"/premium"}
                    onClick={() => setExpanded(false)}
                  >
                    Enchère Premium
                  </NavLink>
                </li>
                <li className="nav-item nav-item-home">
                  <NavLink
                    className="nav-link"
                    to={"/instructions"}
                    onClick={() => setExpanded(false)}
                  >
                    Comment ça marche?
                  </NavLink>
                </li>
              </Nav>
            </Navbar.Collapse>
            {userInfo ? (
              <div className="flex-1 d-none d-lg-flex justify-content-end align-items-center px-4  order-lg-4">
                {" "}
                {/* {freeCredit && auction?.status === "enable" ? (
                  <button className="btn btn-credit free-credit d-flex justify-content-center mx-1 align-items-center">
                    <span>
                      {" "}
                      <i className="fi fi-rr-gift"></i>
                    </span>
                    <p className="m-0">
                      {" "}
                      {freeCredit}
                      <span className="small-td"> BITSO</span>
                    </p>
                  </button>
                ) : null} */}
                <div className="flex justify-content-center">
                  {selectedPurchasedPack && auction?.status === "enable" && (
                    <Tooltip target=".custom-tooltip-btn" position="bottom">
                      <img
                        alt="Img Pack Sélectionné"
                        src={
                          selectedPurchasedPack?.pack_id.image.imageURL ??
                          "Loading..."
                        }
                        data-pr-tooltip="Selected Pack"
                        height="80px"
                        style={{ display: imageLoading ? "none" : "block" }}
                        onLoad={handleImageLoad}
                      />
                      {imageLoading && <span>Loading...</span>}
                    </Tooltip>
                  )}
                  {userInfo?.approved ? (
                    <Button
                      className="btn btn-credit user-credit d-flex justify-content-center mx-1 align-items-center custom-tooltip-btn"
                      onClick={() => dispatch(setShowModalCredit())}
                    >
                      <span>
                        {" "}
                        <img src={coins} alt="coins-icon" />
                      </span>
                      <p className="m-0">
                        {" "}
                        <span style={{ color: "red" }}>
                          {purchasedPacks && purchasedPacks.packPurchases ? (
                            purchasedPacks.packPurchases.filter(
                              (pack) => pack.availability === true
                            ).length
                          ) : updateLoading ? (
                            <CircularProgress color="secondary" size={13} />
                          ) : (
                            0
                          )}
                        </span>
                        <span
                          className="small-td"
                          style={{
                            textTransform: "uppercase",
                            fontSize: "0.9rem",
                          }}
                        >
                          {" "}
                          {purchasedPacks && purchasedPacks.packPurchases
                            ? purchasedPacks.packPurchases.filter(
                                (pack) => pack.availability === true
                              ).length === 1
                              ? "Pack"
                              : "Packs"
                            : "Packs"}
                        </span>
                      </p>
                    </Button>
                  ) : null}
                </div>
                <Dropdown className="py-0 ms-4">
                  <Dropdown.Toggle
                    className="user-header-icon px-2 py-0 profile-btn"
                    variant="light"
                    id="dropdown-basic"
                  >
                    <img src={userInfo?.profile_img?.imageURL}></img>{" "}
                    {userInfo?.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/profile")}>
                      Mon compte
                    </Dropdown.Item>
                    {userInfo?.isAdmin ? (
                      <Dropdown.Item onClick={() => navigate("/dashboard")}>
                        Tableau de bord
                      </Dropdown.Item>
                    ) : null}
                    <Dropdown.Item
                      className="dropdown-links"
                      onClick={() => {
                        dispatch(logout()).then((res) => {
                          if (res.payload.status === 200) {
                            return navigate("/");
                          }
                        });
                      }}
                    >
                      Déconnexion
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <Link
                to={"/signin"}
                className="flex-1 d-none d-lg-flex justify-content-end px-3 order-lg-4"
              >
                {" "}
                <button className="btn btn-connect d-flex justify-content-center align-items-center">
                  <i className="fi fi-rr-user"></i>
                  <p className="m-0"> se connecter </p>
                </button>
              </Link>
            )}
            <div className="d-lg-none d-flex align-items-center justify-content-end">
              {userInfo ? (
                userInfo.isAdmin ? (
                  <Link to={"/dashboard"}>
                    <button className="small-connect-btn align-self-center">
                      <i className="fi fi-rr-user color-white text-center mt-2"></i>
                    </button>
                  </Link>
                ) : (
                  <Link to={"/profile"}>
                    <button className="small-connect-btn align-self-center">
                      <i className="fi fi-rr-user color-white text-center mt-2"></i>
                    </button>
                  </Link>
                )
              ) : (
                <Link to={"/signin"}>
                  <button className="small-connect-btn align-self-center">
                    <i className="fi fi-rr-user color-white text-center mt-2"></i>
                  </button>
                </Link>
              )}
            </div>
          </Container>
          {!locationTestCategoryBar && (
            <Container
              fluid
              className={`bar-category d-flex justify-content-between`}
            >
              <ul className="px-2">
                <li>
                  <NavLink
                    className="d-flex justify-content-center align-items-center"
                    to={`/category/electromenager`}
                  >
                    <img src={energy} />
                    <p className="m-0 d-none d-lg-block">Electroménager</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="d-flex justify-content-center align-items-center"
                    to={`/category/electronique`}
                  >
                    <i className="fi fi-rr-computer"></i>
                    <p className="m-0 d-none d-lg-block">Electronique</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="d-flex justify-content-center align-items-center"
                    to={`/category/mode`}
                  >
                    <img src={clothesHanger} />
                    <p className="m-0  d-none d-lg-block">Mode</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="d-flex justify-content-center align-items-center"
                    to={`/category/sport`}
                  >
                    <i className="fi fi-rr-football"></i>
                    <p className="m-0  d-none d-lg-block">Sport</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="d-flex justify-content-center align-items-center"
                    to={`/category/voiture`}
                  >
                    <i className="fi fi-rr-car-alt"></i>
                    <p className="m-0  d-none d-lg-block">Voiture</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="d-flex justify-content-center align-items-center"
                    to={`/category/Loisirs`}
                  >
                    <i className="fi fi-rr-plane"></i>
                    <p className="m-0  d-none d-lg-block">Loisirs</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="d-flex justify-content-center align-items-center"
                    to={`/category/bijoux`}
                  >
                    <i className="fi fi-rr-gem"></i>
                    <p className="m-0  d-none d-lg-block">Montre & Bijoux</p>
                  </NavLink>
                </li>
              </ul>
            </Container>
          )}
        </Navbar>
      ) : null}
    </>
  );
};

export default Header;
