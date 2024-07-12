import { adGetAllUsers } from "@/services/userService";
import ActivityTitle from "./ActivityTitle";
import UserEditorTools from "./UserEditorTools";
import LinkButton from "./LinkButton";
import DynamicIcon from "./DynamicIcon";

const UsersTableAndActions = async () => {
  const users = await adGetAllUsers();
  return (
    <div className="bg-base-300 w-full rounded-box p-3 flex flex-col gap-3">
      <ActivityTitle text="Todos os usuários" />
      <div className="w-fit ms-auto p-3">
        <LinkButton
          to="/dashboard/conta/novo-usuario"
          color="primary"
          text="Novo usuário"
          icon={<DynamicIcon name="plus" />}
          outline
        />
      </div>
      <div className="rounded-box h-full p-3 max-h-[90%] xl:max-h-[93%]">
        <div className="overflow-x-auto max-h-full">
          <table className="table table-zebra table-pin-rows table-pin-cols">
            <thead className="font-bold">
              <tr className="text-base-content z-[60]">
                <th>#</th>
                <th className="w-full">Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(
                (
                  user: {
                    id: number;
                    username: string;
                    name: string;
                    active: boolean | null;
                    admin: boolean | null;
                  },
                  index: number
                ) => (
                  <tr key={index} className="h-20">
                    <td className="font-bold">{user.id}</td>
                    <td>{user.name}</td>
                    <td>
                      <UserEditorTools user={user} />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTableAndActions;
