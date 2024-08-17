export async function isValidPassword(
  password: string,
  hashedPassword: string
) {
  const hashedEnteredPassword = await hashPassword(password);
  return hashedEnteredPassword === hashedPassword;
}

export async function hashPassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );
  return Buffer.from(arrayBuffer).toString("base64");
}
