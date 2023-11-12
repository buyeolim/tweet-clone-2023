import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import db from "@libs/server/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, password } = req.body;

  let user;
  if (email) {
    user = await db.user.findUnique({ where: { email } });
    if (user) {
      return res.status(400).end();
    }

    user = await db.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }

  return res.status(200).end();
}

export default withHandler("POST", handler);
