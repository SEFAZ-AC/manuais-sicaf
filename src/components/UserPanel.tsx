import UserEditor from "./UserEditor";
import UsersTableAndActions from "./UsersTableAndActions";

const UserPanel = ({ user }: { user: any }) => {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-12">
      <UserEditor user={user} />
      {user.admin ? <UsersTableAndActions /> : ""}
    </div>
  );
};

export default UserPanel;
