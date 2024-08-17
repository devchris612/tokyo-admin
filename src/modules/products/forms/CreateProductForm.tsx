"use client";

import { createSongAction } from "@/app/actions.ts/createSongAction";
import { updateSongAction } from "@/app/actions.ts/updateSongAction";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Song } from "@/lib/types";
import React, { useMemo } from "react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  song?: Song | null;
  closeModal: () => void;
};

function CreateProductForm({ song, closeModal }: Props) {
  const [error, action] = useFormState(
    !song ? createSongAction : updateSongAction.bind(null, song?._id as string),
    {}
  );
  const { pending } = useFormStatus();

  const formTitle = useMemo(() => {
    if (song) return "Chỉnh sửa bài hát";
    return "Tạo bài hát mới";
  }, [song]);

  return (
    <form action={action}>
      <div className="p-4 font-semibold border-b">{formTitle}</div>

      <div className="p-4 bg-secondary flex flex-col gap-4">
        <div>
          <Label htmlFor="song_name">Tên bài hát *</Label>
          <Input
            type="text"
            name="song_name"
            id="song_name"
            placeholder="Nhập tên sản phẩm"
            defaultValue={song?.title}
          />
          {error?.song_name && (
            <p className="text-destructive text-sm">{error.song_name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="song_description">Mô tả</Label>
          <Textarea
            name="song_description"
            id="song_description"
            placeholder="Nhập mô tả"
            defaultValue={song?.description}
          />
          {error?.song_description && (
            <p className="text-destructive text-sm">{error.song_description}</p>
          )}
        </div>
        <div>
          <Label htmlFor="song_image">Ảnh bài hát *</Label>
          <Input
            type="text"
            name="song_image"
            id="song_image"
            placeholder="Nhập link ảnh sản phẩm"
            defaultValue={song?.imageUrl}
          />
          {error?.song_image && (
            <p className="text-destructive text-sm">{error.song_image}</p>
          )}
        </div>
        <div>
          <Label htmlFor="song_url">Link bài hát</Label>
          <Input
            type="text"
            name="song_url"
            id="song_url"
            placeholder="Nhập link bài hát"
            defaultValue={song?.songUrl}
          />
          {error?.song_url && (
            <p className="text-destructive text-sm">{error.song_url}</p>
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
            {song ? "Lưu" : "Tạo mới"}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}

export default CreateProductForm;
