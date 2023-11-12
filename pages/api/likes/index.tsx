import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { tweetId, userId } = req.query;

  const like = await db.like.findMany({
    where: {
      tweetId: +tweetId,
      userId: +userId,
    },
  });

  return res.status(200).json({
    ok: true,
    like,
  });
}

export default withHandler("GET", handler);
