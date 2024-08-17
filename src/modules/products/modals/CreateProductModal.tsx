"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateProductForm from "../forms/CreateProductForm";
import { Song } from "@/lib/types";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  song?: Song | null;
  className?: string;
};

function CreateProductModal({
  children,
  song,
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
        <CreateProductForm
          song={song}
          closeModal={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateProductModal;
