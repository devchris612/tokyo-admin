"use server";

import { deleteUser } from "../data/users";

export const deleteUserAction = async (id: string) => {
  await deleteUser(id);
};
