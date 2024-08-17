"use server";

import { deleteSong } from "../data/songs";

export async function deleteSongAction(songId: string) {
  await deleteSong(songId);
}
