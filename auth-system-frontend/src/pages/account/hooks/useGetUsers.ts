import { useEffect } from "react";
import { resetUsers, getUsers } from "redux/actions";
import { useRedux } from "hooks";

export default function useGetUsers() {
  const { dispatch, appSelector } = useRedux();

  const { loading, users } = appSelector(
    (state: {
      Users: {
        loading: any;
        users: any;
      };
    }) => ({
      loading: state.Users.loading,
      users: state.Users.users,
    })
  );

  useEffect(() => {
    dispatch(resetUsers());
  }, [dispatch]);

  /*
   * handle form submission
   */
  const getAllUsers = () => {
    dispatch(getUsers());
  };

  return {
    loading,
    users,
    getAllUsers,
  };
}
