import { Navigate } from "react-router-dom";
import { APICore } from "helpers/api/apiCore";

type PrivateRouteProps = {
  component: React.ComponentType;
};

const PrivateRoute = ({
  component: RouteComponent,
  ...rest
}: PrivateRouteProps) => {
  const api = new APICore();

  if (api.isUserAuthenticated() === false) {
    return <Navigate to="/auth/login" />;
  }

  return <RouteComponent />;
};

export default PrivateRoute;
