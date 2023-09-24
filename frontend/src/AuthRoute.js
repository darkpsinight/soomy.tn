import { Navigate } from "react-router-dom";
import { useSelector} from "react-redux";

export const ProtectedRoute = ({ children }) => {
    const { userInfo } = useSelector(state=>state.user);

  if (!userInfo) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
export const AuthRoute = ({ children }) => {
    const { userInfo } = useSelector(state=>state.user);

  if (userInfo) {
    // previous page
    return <Navigate to={-1} />;
  }
  return children;
};
export const AdminRoute = ({ children }) => {
    const { userInfo } = useSelector(state=>state.user);

  if (!userInfo?.isAdmin) {
    // user is not admin
    return <Navigate to="/" />;
  }
  return children;
};
export const ApprovedRoute = ({ children }) => {
    const { userInfo } = useSelector(state=>state.user);

    if (userInfo&&(!userInfo?.approved)) {
      // user is verified
      return <Navigate to="/phone" />;
    }
    return children;

};
export const PhoneRoute = ({ children }) => {
    const { userInfo } = useSelector(state=>state.user);

    if (!userInfo || userInfo?.approved ) {
      // user is verified
      return <Navigate to={-1} />;
    }
    return children;

};
