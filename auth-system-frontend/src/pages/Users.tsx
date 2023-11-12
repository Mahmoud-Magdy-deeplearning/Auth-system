import { useEffect } from "react";
import { useGetUsers } from "./account/hooks";
import { Link } from "react-router-dom";

const Users = () => {
  const { loading, users, getAllUsers } = useGetUsers();
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {loading ? (
        <div className="loading-indicator min-h-screen w-full justify-center items-center flex">
          <span className="loading loading-dots  w-1/12"></span>
        </div>
      ) : (
        <>
          {users.length === 0 ? (
            <div className="loading-indicator min-h-screen w-full justify-center items-center flex flex-col">
              <p className="text-4xl mb-10">No users found</p>
              <Link to="/auth/logout" className="btn btn-primary">
                logout
              </Link>
            </div>
          ) : (
            <div className="flex justify-center flex-col ">
              <p className="text-center w-full text-5xl text-white font-semibold pt-10">
                Users
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5   w-full p-20 ">
                {users.map(
                  (user: { username: string; email: string }, idx: number) => (
                    <div
                      key={idx}
                      className="col-span-1 bg-white shadow-md rounded-lg p-6 m-4"
                    >
                      <div>
                        <h5 className="text-black font-semibold">
                          Name: {user.username}
                        </h5>
                        <p className="text-black"> Email: {user.email}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
              <Link to="/auth/logout" className="btn btn-primary">
                logout
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;
