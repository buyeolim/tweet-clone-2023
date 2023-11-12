import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { userId } = req.query;

  const user = await db.user.findUnique({
    where: {
      id: +userId,
    },
  });

  return res.status(200).json({
    ok: true,
    user,
  });
}

export default withHandler("GET", handler);
