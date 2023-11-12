import { useEffect } from "react";
import * as yup from "yup";
import { resetAuth, signupUser } from "redux/actions";
import { useRedux } from "hooks";
import { UserData } from "../Register";

export default function useRegister() {
  const { dispatch, appSelector } = useRedux();

  const { loading, error, userLoggedIn, user, userSignUp } = appSelector(
    (state: {
      Auth: {
        loading: any;
        registerError: any;
        userLoggedIn: any;
        user: any;
        userSignUp: any;
      };
    }) => ({
      loading: state.Auth.loading,
      error: state.Auth.registerError,
      userLoggedIn: state.Auth.userLoggedIn,
      user: state.Auth.user,
      userSignUp: state.Auth.userSignUp,
    })
  );

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const yupSchema = yup.object().shape({
    username: yup.string().required("Please enter username"),
    email: yup
      .string()
      .required("Please enter Email")
      .email("Please enter valid Email"),
    password: yup
      .string()
      .required("Please enter Password")
      .min(8, "Password must be at least 8 characters.")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
          "Password must contain at least 1 letter, 1 number, and 1 special character.",
      }),
  });
  /*
   * handle form submission
   */
  const onSubmit = (formData: UserData) => {
    dispatch(
      signupUser(formData["username"], formData["email"], formData["password"])
    );
  };

  return {
    loading,
    userSignUp,
    userLoggedIn,
    user,
    error,
    yupSchema,
    onSubmit,
  };
}
