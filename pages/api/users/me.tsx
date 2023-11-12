import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await db.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  return res.status(200).json({
    ok: true,
    profile,
  });
}

export default withApiSession(withHandler("GET", handler));
