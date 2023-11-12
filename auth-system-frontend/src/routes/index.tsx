import React, { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";

// lazy load all the views

// auth
const Login = React.lazy(() => import("pages/account/Login"));
const Logout = React.lazy(() => import("pages/account/Logout"));
const Register = React.lazy(() => import("pages/account/Register"));
const Users = React.lazy(() => import("pages/Users"));

const ErrorPageNotFound = React.lazy(() => import("pages/error/PageNotFound"));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
  <Suspense fallback={loading()}>
    <Component />
  </Suspense>
);

const AllRoutes = () => {
  return useRoutes([
    { path: "/", element: <Root /> },
    {
      // public routes
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "auth",
          children: [
            { path: "login", element: <LoadComponent component={Login} /> },
            { path: "logout", element: <LoadComponent component={Logout} /> },
            {
              path: "signup",
              element: <LoadComponent component={Register} />,
            },
          ],
        },
        {
          path: "*",
          element: <LoadComponent component={ErrorPageNotFound} />,
        },
      ],
    },
    {
      // auth protected routes
      path: "/",
      element: <PrivateRoute component={Outlet} />,
      children: [
        {
          path: "protected-paths",
          children: [
            {
              path: "users",
              element: <LoadComponent component={Users} />,
            },
            {
              path: "*",
              element: <LoadComponent component={ErrorPageNotFound} />,
            },
          ],
        },
      ],
    },
  ]);
};

export { AllRoutes };
