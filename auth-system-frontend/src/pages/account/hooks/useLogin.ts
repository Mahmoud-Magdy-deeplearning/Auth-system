import { useEffect } from "react";
import * as yup from "yup";
import { resetAuth, loginUser } from "redux/actions";
import { useRedux } from "hooks";
import { UserData } from "../Login";

export default function useLogin() {
  const { dispatch, appSelector } = useRedux();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, userLoggedIn, user, error } = appSelector((state) => ({
    loading: state.Auth.loading,
    user: state.Auth.user,
    error: state.Auth.error,
    userLoggedIn: state.Auth.userLoggedIn,
  }));

  const yupSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid Email")
      .required("Please enter Email"),
    password: yup
      .string()
      .required("Please enter Password")
      .min(8, "Password must be at least 8 characters.")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
          "Password must contain at least 1 letter, 1 number, and 1 special character.",
      }),
  });

  const onSubmit = (formData: UserData) => {
    dispatch(loginUser(formData["email"], formData["password"]));
  };

  return {
    loading,
    userLoggedIn,
    user,
    error,
    yupSchema,
    onSubmit,
  };
}
