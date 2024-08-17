"use server";

import { z } from "zod";
import { updateUser } from "../data/users";

export async function updateUserAction(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const addSchema = z.object({
    email: z.string().min(1, { message: "Vui lòng điền email" }),
    password: z.string().min(1, { message: "Vui lòng điền mật khẩu" }),
    name: z.string().min(1, { message: "Vui lòng điền tên người dùng" }),
    dob: z.string().min(1, { message: "Vui lòng điền ngày sinh" }),
    phone: z.string().min(1, { message: "Vui lòng số điện thoại" }),
    avatar: z.string().min(1, { message: "Vui lòng điền link avatar" }),
  });

  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const { email, password, name, dob, phone, avatar } = result.data;

  await updateUser(id, email, password, name, dob, phone, avatar);
}
