import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    res.setHeader("Set-Cookie", [
      `access=deleted; Max-Age=0; path=/`,
      `refresh=deleted; Max-Age=0; path=/`,
    ]);

    await req.session.destroy();

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: error });
  }
}

export default withApiSession(withHandler("GET", handler));
