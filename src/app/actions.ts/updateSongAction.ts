"use server";

import { z } from "zod";
import { createSong, updateSong } from "../data/songs";

export async function updateSongAction(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const addSchema = z.object({
    song_name: z.string().min(1, { message: "Vui lòng điền tên bài hát" }),
    song_description: z.string().min(1, { message: "Vui lòng điền mô tả" }),
    song_image: z
      .string()
      .min(1, { message: "Vui lòng điền link ảnh bài hát" }),
    song_url: z.string().min(1, { message: "Vui lòng điền link bài hát" }),
  });

  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const { song_name, song_description, song_image, song_url } = result.data;

  await updateSong(id, song_name, song_description, song_url, song_image);
}
