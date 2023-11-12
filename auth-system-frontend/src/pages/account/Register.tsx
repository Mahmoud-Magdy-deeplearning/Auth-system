import { Link, Navigate } from "react-router-dom";
import { useRegister } from "./hooks";
import { useState } from "react";
import DangerAlert from "components/DangerAlert";

export type UserData = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const { loading, userLoggedIn, user, error, yupSchema, onSubmit } =
    useRegister();
  const [errors, setErrors] = useState({} as any);

  const submit = async (event: any) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
      username: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const username = target.username.value;

    const data = { email, password, username };
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
        <div className="w-full max-w-md bg-gray-100 py-10">
          <h2 className="text-2xl font-extrabold text-center text-gray-900">
            Sign Up
          </h2>
          <div className="flex w-full justify-center">
            {error && <DangerAlert error={error.response.data.message} />}
          </div>
          <form className="mt-8 space-y-6" onSubmit={submit}>
            <div className="rounded-md shadow-sm  flex-col py-10  ">
              <div className="flex flex-col items-center justify-center mx-10">
                <label
                  htmlFor="username"
                  className="text-black font-semibold text-lg sr-only"
                >
                  User Name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input input-bordered w-full"
                  placeholder="User Name"
                />
                {errors.username && (
                  <p className="text-red-700 font-semibold bg-transparent w-full p-2">
                    {errors.username}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center justify-center mx-10 mt-5 ">
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
                Sign up
              </button>
              <div className="flex flex-row justify-center items-center  pt-4">
                <p> Do you already have an account? </p>
                <Link
                  to="/auth/login"
                  className="text-sm text-blue-500 hover:text-blue-700 pl-1"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
