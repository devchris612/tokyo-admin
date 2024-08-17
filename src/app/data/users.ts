import axios from "axios";
import { revalidatePath } from "next/cache";
import { revalidate } from "../layout";

export async function getAllUsers(skip: number, limit: number) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?skip=${skip}&limit=${limit}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  dob: string,
  phone: string,
  avatarUrl: string
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`;
    const res = await axios.post(url, {
      email,
      password,
      name,
      dob,
      phone,
      avatarUrl,
    });
    revalidatePath("/users");
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function updateUser(
  id: string,
  email: string,
  password: string,
  name: string,
  dob: string,
  phone: string,
  avatarUrl: string
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`;
    const res = await axios.put(url, {
      email,
      password,
      name,
      dob,
      phone,
      avatarUrl,
    });
    revalidatePath("/users");
  } catch (error: any) {
    console.error(error.message);
  }
}

export const deleteUser = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`;
    const res = await axios.delete(url);
    revalidatePath("/users");
  } catch (error: any) {
    console.error(error.message);
  }
};

export const countUsers = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/count`;
    const res = await axios.get(url);

    revalidatePath("/");
    return res.data;
  } catch (error: any) {
    console.error(error.config.data);
  }
};
