// import { Button, Alert } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useLogin } from "./hooks";
import { useState } from "react";
import DangerAlert from "components/DangerAlert";
export type UserData = {
  email: string;
  password: string;
};

const Login = () => {
  const { loading, userLoggedIn, user, error, yupSchema, onSubmit } =
    useLogin();

  const [errors, setErrors] = useState({} as any);
  const submit = async (event: any) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const data = { email, password };
    try {
      await yupSchema.validate(data, {
        abortEarly: false,
      });

      onSubmit(data);
    } catch (err: any) {
      const errors: any = {};
      err.inner.forEach((error: any) => {
        if (!errors[error.path]) errors[error.path] = error.message;
      });
      setErrors(errors);
    }
  };
  return (
    <>
      {(userLoggedIn || user) && <Navigate to="/"></Navigate>}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <div className="w-full max-w-md bg-gray-100 py-10    ">
          <h2 className="text-2xl font-extrabold text-center text-gray-900">
            Sign In
          </h2>
          <div className="flex w-full justify-center">
            {error && <DangerAlert error={error.response.data.message} />}
          </div>
          <form className="mt-8 space-y-6" onSubmit={submit}>
            <div className="rounded-md shadow-sm  flex-col py-5  ">
              <div className="flex flex-col items-center justify-center mx-10">
                <label
                  htmlFor="email-address"
                  className="text-black font-semibold text-lg sr-only"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input input-bordered   w-full"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="text-red-700 font-semibold bg-transparent w-full p-2">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center mt-5 mx-10">
                <label
                  htmlFor="password"
                  className="text-black font-semibold text-lg sr-only"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input input-bordered w-full "
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-700 font-semibold bg-transparent  w-full p-2  ">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center flex-col">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Log In
              </button>
              <div className="flex flex-row justify-center items-center">
                <p> Don't have an account? </p>
                <Link
                  to="/auth/signup"
                  className="text-sm text-blue-500 hover:text-blue-700 pl-1"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
