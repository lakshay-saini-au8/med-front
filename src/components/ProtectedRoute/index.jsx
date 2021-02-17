import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restProps }) => {
  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;
  return userInfo ? (
    <Route
      {...restProps}
      render={(routeProps) => <Component {...routeProps} />}
    />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
