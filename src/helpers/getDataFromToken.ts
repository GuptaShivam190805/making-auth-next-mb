import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type TokenPayload = {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
};

export const getDataFromToken = (request: NextRequest): string => {
  const token = request.cookies.get("token")?.value;

  if (!token) throw new Error("NO_TOKEN");

  const decoded = jwt.verify(
    token,
    process.env.TOKEN_SECRET!
  ) as TokenPayload;

  return decoded.id;
};
