import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { userId, text } = req.body;

  const tweets = await db.tweet.create({
    data: {
      userId,
      text,
    },
  });

  return res.status(200).json({
    ok: true,
    tweets,
  });
}

export default withHandler("POST", handler);
