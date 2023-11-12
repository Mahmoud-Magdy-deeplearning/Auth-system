import { Link } from "react-router-dom";
// import Logo from 'assets/images/logo.png';

const ErrorPageNotFound = () => {
  return (
    <>
      <div className="w-full min-h-screen justify-center items-center flex">
        <div className="pt-4 pb-4 text-center bg-primary">
          <Link to="/">
            {/* <span>
              <img src={Logo} alt="" height="18" />
          </span> */}
          </Link>
        </div>

        <div className="px-4 py-6">
          <div className="text-center">
            <h1 className="text-6xl">404</h1>
            <h4 className="text-2xl text-red-500 mt-3">Page Not Found</h4>
            <p className="text-gray-200 mt-3">
              It's looking like you may have taken a wrong turn. Don't worry...
              it happens to the best of us. Here's a little tip that might help
              you get back on track.
            </p>

            <Link className="btn btn-info mt-7" to="/">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPageNotFound;
