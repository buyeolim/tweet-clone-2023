import { withIronSessionApiRoute } from "iron-session/next";

const cookieOptions = {
  cookieName: process.env.IS_COOKIENAME!,
  password: process.env.IS_COOKIEPW!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
