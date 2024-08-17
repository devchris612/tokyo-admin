"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import CreateUserModal from "./modals/CreateUserModal";
import { deleteUserAction } from "@/app/actions.ts/deleteUserAction";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getDisplayPages } from "@/lib/utils";
import { USERS_PER_PAGE } from "@/lib/constants";
import Link from "next/link";

type Props = {
  users: User[];
  count: number;
};

function UsersTable({ users, count }: Props) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const pages = useMemo(() => {
    return getDisplayPages(Math.ceil(count / USERS_PER_PAGE), currentPage, 3);
  }, [count, currentPage, users]);

  if (users.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-center">
        Không tìm thấy người dùng nào
      </p>
    );
  }

  return (
    <>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Avatar</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ngày sinh</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-10 h-10"
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>

              <TableCell>{user.dob}</TableCell>

              <TableCell>{user.phone}</TableCell>
              <TableCell className="text-right">
                <CreateUserModal
                  user={user}
                  className="bg-white hover:bg-transparent text-primary mr-2">
                  <FaRegEdit />
                </CreateUserModal>

                <Button
                  onClick={(e) => {
                    const isConfirmed = window.confirm(
                      "Are you sure to delete this user?"
                    );
                    if (isConfirmed) {
                      deleteUserAction(user._id);
                    }
                  }}
                  className="bg-transparent hover:bg-transparent text-primary">
                  <FaRegTrashAlt />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end">
        {currentPage > 1 ? (
          <Button
            variant={"outline"}
            className="rounded-none"
            asChild>
            <Link href={`/users/?page=${currentPage - 1}`}>Prev</Link>
          </Button>
        ) : null}
        {pages.map((val) => (
          <Button
            variant={"outline"}
            className={`rounded-none ${
              val === currentPage ? "bg-secondary" : ""
            }`}
            key={`pg-${val}`}
            asChild>
            <Link href={`/users/?page=${val}`}>{val}</Link>
          </Button>
        ))}
        {currentPage < pages.length ? (
          <Button
            variant={"outline"}
            className="rounded-none"
            asChild>
            <Link href={`/users/?page=${currentPage + 1}`}>Next</Link>
          </Button>
        ) : null}
      </div>
    </>
  );
}

export default UsersTable;
