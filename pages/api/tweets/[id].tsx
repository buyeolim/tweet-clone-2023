import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;

  const tweet = await db.tweet.findUnique({
    where: {
      id: +id,
    },
  });

  return res.status(200).json({
    ok: true,
    tweet,
  });
}

export default withHandler("GET", handler);
