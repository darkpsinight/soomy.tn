import React, { useEffect } from "react";
import auction from "../../../assets/images/AUCTION.png";
import logoutImg from "../../../assets/images/logout.png";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Banner from "../../../components/Banner";
import { logout, setCloseModal } from "../../../redux/userSlice";
import coins from "../../../assets/images/Layer_40.png";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/userSlice";
const Profile = () => {
  /*   useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [navigate, isAuth]); */
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  useEffect(() => {
    dispatch(setCloseModal());
  }, []);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div className="moving-main">
      <main className="container py-lg-2 px-lg-0">
        <div className="d-flex d-lg-none justify-content-between align-items-center py-4">
          <button
            className="btn user-header-icon px-2 py-1 profile-btn"
            variant="light"
            id="dropdown-basic"
          >
            <img src={userInfo?.profile_img?.imageURL}></img>{" "}
            {userInfo.username}
          </button>
          {/* <button className="btn btn-credit d-flex justify-content-center align-items-center">
            <span>
              {" "}
              <img src={coins} alt="coins-icon" />
            </span>
            <p className="m-0" style={{ color: "#3a0412" }}>
              {" "}
              {userInfo?.credit?.montant}{" "}
              <span className="small-td">BITSO</span>
            </p>
          </button> */}
        </div>
        <Banner />
        <section className="faq-container px-lg-2 py-3 d-flex">
          <div className="profile-bar">
            <ul className="mb-0">
              <li>
                <NavLink to={"/profile/commandes"}>
                  <i className="fi fi-rr-box-alt"></i> Mes commandes
                </NavLink>
              </li>

              <li>
                <NavLink to={"/profile/auctions"}>
                  <img src={auction} alt="auction-icon" />
                  Mes Enchères
                </NavLink>
              </li>

              <li>
                <NavLink to={"/profile/transactions"}>
                  <i className="fi fi-rr-coins"></i> Transactions
                </NavLink>
              </li>

              <li>
                <NavLink end to={"/profile"}>
                  <i className="fi fi-rr-settings"></i> Infos. du compte
                </NavLink>
              </li>
              <li
                onClick={() => {
                  dispatch(logout()).then((res) => {
                    if (res.payload.status === 200) {
                      navigate("/");
                    }
                  });
                }}
              >
                <img src={logoutImg} alt="lougout-icon" />
                Déconnexion
              </li>
            </ul>
          </div>
          <div className="main-profile py-0 px-lg-2">
            <Outlet />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
