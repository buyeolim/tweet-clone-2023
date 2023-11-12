import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { userId, tweetId } = req.body;

  const like = await db.like.create({
    data: {
      userId,
      tweetId,
    },
  });

  return res.status(200).json({
    ok: true,
    like,
  });
}

export default withHandler("POST", handler);
