import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollUp from "./components/ScrollUp";
import FixedBar from "./components/FixedBar";
import CreditModal from "./components/CreditModal";
import { setCloseModalCredit } from "./redux/userSlice";
import "./scss/style.scss";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/userSlice";
import { getPurchase, getSelectedPurchase } from "./redux/packPurchaseSlice";
import { ProtectedRoute, AuthRoute, AdminRoute, ApprovedRoute,PhoneRoute } from "./AuthRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserParticipation } from "./redux/participationSlice";
import { handleClose, handleShow } from "./redux/dashboardSlice";
import SearchModal from "./components/SearchModal";
import Header from "./components/header/Header";
import 'antd/dist/reset.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Home = React.lazy(() => import("./views/pages/home/Home"));
const Categories = React.lazy(() =>
  import("./views/pages/auctions/Categories")
);
const Profile = React.lazy(() => import("./views/pages/profile/Profile"));
const ProfileUser = React.lazy(() => import("./views/pages/profile/User"));
const ProfileAuctions = React.lazy(() =>
  import("./views/pages/profile/Auctions")
);
const ProfileCommandes = React.lazy(() =>
  import("./views/pages/profile/Commandes")
);
const ProfileTransactions = React.lazy(() =>
  import("./views/pages/profile/Transactions")
);
const Faq = React.lazy(() => import("./views/pages/Instructions/Faq"));
const Auctions = React.lazy(() => import("./views/pages/auctions/Auctions"));
const SearchPage = React.lazy(() =>
  import("./views/pages/auctions/SearchPage")
);
const Validation = React.lazy(() =>
  import("./views/pages/checkout/Validation")
);
const Checkout = React.lazy(() => import("./views/pages/checkout/Checkout"));
const WindowPopup = React.lazy(() => import("./views/pages/windowPopup/WindowPopup"));
const Premium = React.lazy(() => import("./views/pages/auctions/Premium"));
const PremiumProduct = React.lazy(() =>
  import("./views/pages/products/PremiumProduct")
);
const Product = React.lazy(() => import("./views/pages/products/Product"));
const Finished = React.lazy(() => import("./views/pages/auctions/Finished"));
const Instructions = React.lazy(() =>
  import("./views/pages/Instructions/Instructions")
);
const Conditions = React.lazy(() =>
  import("./views/pages/Instructions/Conditions")
);
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Phone = React.lazy(() => import("./views/pages/register/Phone"));
const Reset = React.lazy(() => import("./views/pages/register/Reset"));
const Token = React.lazy(() => import("./views/pages/register/validate"));
const Mentions = React.lazy(() =>
  import("./views/pages/Instructions/Mentions")
);
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, showModal, montant } = user;

  useEffect(() => {
    dispatch(getUser());
  }, []);
  
  const dashboard = useSelector((state) => state.dashboard);
  const { showSearch } = dashboard;

/*   useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserParticipation(userInfo._id));
    }
  }, [dispatch]); */

  return (
    <Router>
      <Header montant={montant} />
      <ScrollUp />
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path="/signin"
            name="Login Page"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register />}
          />
          <Route exact path="/phone" name="Register Page" element={<PhoneRoute><Phone /></PhoneRoute>} />
          <Route exact path="/validate" name="Validate Page" element={<Token />} />
          <Route
            exact
            path="/reset"
            name="Reset Page"
            element={<Reset />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route
            exact
            path="/dashboard/*"
            name="Dashboard"
            element={
              <ApprovedRoute>
              <AdminRoute>
                <DefaultLayout />
              </AdminRoute>
              </ApprovedRoute>

            }
          ></Route>
          <Route
            exact
            path="/auction"
            name="Auction"
            element={<ApprovedRoute><Auctions /></ApprovedRoute>}
          ></Route>
          <Route
            exact
            path="/search"
            name="SearchPage "
            element={<ApprovedRoute><SearchPage /></ApprovedRoute>}
          ></Route>
          <Route
            exact
            path="/premium"
            name="Premium"
            element={<ApprovedRoute><Premium /></ApprovedRoute>}
          ></Route>
          <Route
            exact
            path="/finished"
            name="Finished"
            element={<ApprovedRoute><Finished /></ApprovedRoute>}
          ></Route>
          <Route
            exact
            path="/instructions"
            name="Instructions"
            element={<ApprovedRoute><Instructions /></ApprovedRoute>}
          ></Route>
          <Route
            exact
            path="/conditions"
            name="Conditions"
            element={<ApprovedRoute><Conditions /></ApprovedRoute>}
          ></Route>
          <Route
            exact
            path="/mentions"
            name="Mentions"
            element={<ApprovedRoute><Mentions /></ApprovedRoute>}
          ></Route>
          <Route exact path="/faq" name="Faq" element={<Faq />}></Route>
          <Route
            exact
            path="/product/:id"
            name="Product"
            element={<ApprovedRoute><Product /></ApprovedRoute>}
          ></Route>
          <Route
            exact
            path="/premiumproduct/:id"
            name="PremiumProduct"
            element={<ApprovedRoute><PremiumProduct /></ApprovedRoute>}
          ></Route>
          <Route
            exact
            path="/category/:id"
            name="Categories"
            element={<ApprovedRoute><Categories /></ApprovedRoute>}
          ></Route>
          <Route
            exact
            path="/profile"
            name="Profile"
            element={
              <ApprovedRoute>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
              </ApprovedRoute>
            }
          >
            <Route
              exact
              index
              name="ProfileUser"
              element={<ProfileUser />}
            ></Route>
            <Route
              exact
              path="auctions"
              name="ProfileAuctions "
              element={<ProfileAuctions />}
            ></Route>
            <Route
              exact
              path="commandes"
              name="ProfileCommandes"
              element={<ProfileCommandes />}
            ></Route>
            <Route
              exact
              path="transactions"
              name="ProfileTransactions"
              element={<ProfileTransactions />}
            ></Route>
          </Route>
          <Route
            exact
            path="/validation/:id"
            name="Validation"
            element={
              <ApprovedRoute>
              <ProtectedRoute>
                <Validation />
              </ProtectedRoute>
              </ApprovedRoute>
            }
          ></Route>
          <Route
            exact
            path="/checkout/:id"
            name="Checkout"
            element={
              <ApprovedRoute>
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
              </ApprovedRoute>
            }
          ></Route>
          <Route
            exact
            path="/WindowPopup"
            name="WindowPopup"
            element={<WindowPopup />}
          ></Route>
          <Route index path="*" name="Home" element={<ApprovedRoute><Home /></ApprovedRoute>}></Route>
        </Routes>
      </Suspense>
      <ToastContainer />

      <FixedBar />
      <SearchModal show={showSearch} onHide={() => dispatch(handleClose())} />
      {userInfo ? <CreditModal show={showModal} montant={montant} /> : null}
    </Router>
  );
};

export default App;
