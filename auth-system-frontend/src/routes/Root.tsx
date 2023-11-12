import useRedux from "hooks/useRedux";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Root = () => {
  const [userName, setUser] = useState("");

  const { appSelector } = useRedux();
  const { userLoggedIn, user, loading } = appSelector((state) => ({
    user: state.Auth.user,
    userLoggedIn: state.Auth.userLoggedIn,
    loading: state.Auth.loading,
  }));
  useEffect(() => {
    if (user) {
      const decodedToken: any = jwtDecode(user.token);
      setUser(decodedToken.username);
    }
  }, [user]);
  if (loading)
    return (
      <div className="loading-indicator min-h-screen w-full justify-center items-center flex">
        <span className="loading loading-dots  w-1/12"></span>
      </div>
    );
  return (
    <div className="text-center w-75 m-auto flex justify-center items-center flex-col min-h-screen w-full">
      <h1 className="dark:text-white text-center mt-0 text-5xl">
        Welcome to the home page
      </h1>

      <div className="mb-3">
        {userLoggedIn || user ? (
          <>
            <p className="text-3xl p-5"> Your are logged in as {userName}</p>
            <p className="text-xl p-5">
              You can vist the protected route to access a protected api which
              is getting all the users
            </p>
            <Link to="/protected-paths/users" className="btn btn-primary mx-2">
              Users
            </Link>
            <div className="divider">OR</div>
            <Link to="/auth/logout" className="btn btn-primary mx-2">
              Logout
            </Link>
          </>
        ) : (
          <>
            <p className="text-3xl p-10">
              Your are not logged in , You can login or signup
            </p>
            <Link to="/auth/login" className="btn btn-primary mx-2">
              Login
            </Link>
            <Link to="/auth/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Root;
