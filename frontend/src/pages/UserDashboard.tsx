import UserDashCard from "components/UserDashCard";
import { useQuery } from "react-query";
import { fetchAllUsers } from "services/apiClient";

const UserDashboard = () => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery("allUsers", fetchAllUsers);

  return (
    <div className="h-full w-full p-4 flex flex-col overflow-hidden">
      <h1 className="text-2xl font-semibold text-center">Users Dashboard</h1>
      {isLoading && <p>Loading...</p>}
      {!!error && <p>Error: Looks like there's some issues</p>}
      {!!data && !!data?.length && (
        <div className="flex flex-wrap w-full overflow-auto py-4">
          {data.map((user) => {
            return (
              <UserDashCard
                key={user.id}
                user={user}
                refetch={refetch as any}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
