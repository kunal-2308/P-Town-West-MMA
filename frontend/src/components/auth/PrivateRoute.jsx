import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getCookie } from "../../auth";

const PrivateRoute = ({ children }) => {
  const token = getCookie("userToken");

  return token ? children : <Navigate to="/login" />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
