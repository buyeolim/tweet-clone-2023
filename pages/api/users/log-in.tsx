import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password } = req.body;

  let user;
  if (email) {
    user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ ok: false, msg: "Email not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ ok: false, msg: "Incorrect password" });
    }
  }

  user &&
    (req.session.user = {
      id: user.id,
    });
  await req.session.save();

  return res.status(200).json({ ok: true });
}

export default withApiSession(withHandler("POST", handler));
