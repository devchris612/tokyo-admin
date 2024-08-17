"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateProductForm from "../forms/CreateUserForm";
import { Song, User } from "@/lib/types";
import { ReactNode, useState } from "react";
import CreateUserForm from "../forms/CreateUserForm";

type Props = {
  children: ReactNode;
  user?: User | null;
  className?: string;
};

function CreateUserModal({
  children,
  user,
  className = "bg-primary text-primary-foreground font-medium px-4 py-2 rounded-md text-sm font-medium",
}: Props) {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent>
        <CreateUserForm
          user={user}
          closeModal={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserModal;
