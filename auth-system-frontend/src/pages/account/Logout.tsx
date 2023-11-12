import { Link } from "react-router-dom";
import { useLogout } from "./hooks";

const Logout = () => {
  useLogout();

  return (
    <>
      <div className="text-center w-75 m-auto flex justify-center items-center flex-col min-h-screen w-full">
        <h4 className="text-dark-50 text-center mt-0 fw-bold">
          See You Again !
        </h4>
        <p className="text-muted mb-4">You are now successfully sign out.</p>

        <div className="mb-3">
          <Link to="/auth/login" className="btn btn-primary">
            Login Again
          </Link>
        </div>
      </div>
    </>
  );
};

export default Logout;
