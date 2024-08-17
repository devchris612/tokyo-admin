import { Song } from "@/lib/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function getAllSongs(skip: number, limit: number) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs?skip=${skip}&limit=${limit}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export async function createSong(
  title: string,
  description: string,
  songUrl: string,
  songImage: string
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs`;
    const res = await axios.post(url, {
      title,
      description,
      songUrl,
      imageUrl: songImage,
    });
    const json = res.data;
    revalidatePath("/");
  } catch (error: any) {
    console.error(error.config.data);
  }
}

export async function updateSong(
  id: string,
  title: string,
  description: string,
  songUrl: string,
  songImage: string
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/${id}`;
    const res = await axios.put(url, {
      title,
      description,
      songUrl,
      imageUrl: songImage,
    });
    const json = res.data;
    revalidatePath("/");
  } catch (error: any) {
    console.error(error.config.data);
  }
}

export const deleteSong = async (songId: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/${songId}`;
    const res = await axios.delete(url);
    revalidatePath("/");
  } catch (error: any) {
    console.error(error.config.data);
  }
};

export const countSongs = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/count`;
    const res = await axios.get(url);

    revalidatePath("/");
    return res.data;
  } catch (error: any) {
    console.error(error.config.data);
  }
};
