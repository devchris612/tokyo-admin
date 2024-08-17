"use client";

import { createUserAction } from "@/app/actions.ts/createUserAction";
import { updateUserAction } from "@/app/actions.ts/updateUserAction";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/lib/types";
import { useMemo } from "react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  user?: User | null;
  closeModal: () => void;
};

function CreateUserForm({ user, closeModal }: Props) {
  const [error, action] = useFormState(
    !user ? createUserAction : updateUserAction.bind(null, user?._id as string),
    {}
  );
  const { pending } = useFormStatus();

  const formTitle = useMemo(() => {
    if (user) return "Chỉnh sửa người dùng";
    return "Tạo người dùng mới";
  }, [user]);

  return (
    <form action={action}>
      <div className="p-4 font-semibold border-b">{formTitle}</div>

      <div className="p-4 bg-secondary flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Nhập Email"
            defaultValue={user?.email}
          />
          {error?.email && (
            <p className="text-destructive text-sm">{error.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Password *</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Nhập Password"
          />
          {error?.password && (
            <p className="text-destructive text-sm">{error.password}</p>
          )}
        </div>
        <div>
          <Label htmlFor="song_description">Tên</Label>
          <Textarea
            name="name"
            id="name"
            placeholder="Nhập tên đầy đủ"
            defaultValue={user?.name}
          />
          {error?.name && (
            <p className="text-destructive text-sm">{error.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="avatar">Avatar</Label>
          <Input
            type="text"
            name="avatar"
            id="avatar"
            placeholder="Nhập link avatar"
            defaultValue={user?.avatarUrl}
          />
          {error?.avatar && (
            <p className="text-destructive text-sm">{error.avatar}</p>
          )}
        </div>
        <div>
          <Label htmlFor="dob">Ngày sinh</Label>
          <Input
            type="text"
            name="dob"
            id="dob"
            placeholder="Nhập ngày sinh"
            defaultValue={user?.dob}
          />
          {error?.dob && (
            <p className="text-destructive text-sm">{error.dob}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Nhập số điện thoại"
            defaultValue={user?.phone}
          />
          {error?.phone && (
            <p className="text-destructive text-sm">{error.phone}</p>
          )}
        </div>
      </div>

      <DialogFooter>
        <div className="p-4 flex items-center justify-end gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-primary-foreground text-primary hover:bg-secondary border">
              Huỷ
            </Button>
          </DialogClose>
          <Button
            disabled={pending}
            type="submit">
            {user ? "Lưu" : "Tạo mới"}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}

export default CreateUserForm;
