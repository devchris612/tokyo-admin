import { NextRequest, NextResponse } from "next/server";
import { hashPassword, isValidPassword } from "./lib/isValidPassword";

export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": "Basic",
      },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");
  if (authHeader == null) {
    return false;
  }

  //   "Basic encrypted_token"
  //  decrypted encrypted_token is username:password format

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  const isValid = await isValidPassword(
    password,
    process.env.NEXT_PUBLIC_HASHED_ADMIN_PASSWORD as string
  );

  return process.env.NEXT_PUBLIC_ADMIN_USERNAME === username && isValid;
}

export const config = {
  matcher: "/:path*",
};
