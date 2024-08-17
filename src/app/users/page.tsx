import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import UsersTable from "@/modules/users/UsersTable";
import { countUsers, getAllUsers } from "../data/users";
import CreateUserModal from "@/modules/users/modals/CreateUserModal";
import { USERS_PER_PAGE } from "@/lib/constants";

type Props = {
  searchParams: {
    page: number;
  };
};

async function UsersPage({ searchParams }: Props) {
  const { page } = searchParams;
  const pageNum = page ? Number(page) : 1;
  const skip = page ? (pageNum - 1) * USERS_PER_PAGE : 0;
  const limit = USERS_PER_PAGE;
  const users = await getAllUsers(skip, limit);
  const count = await countUsers();
  return (
    <div>
      <Header title="Danh sách người dùng" />
      <div className="flex items-center justify-end mt-10 mb-10">
        {/* <Input
          type="text"
          placeholder="Tìm kiếm"
          className="w-80"
        /> */}
        <CreateUserModal>Tạo mới</CreateUserModal>
      </div>
      <UsersTable
        users={users}
        count={count}
      />
    </div>
  );
}

export default UsersPage;
