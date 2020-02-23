import * as functions from "firebase-functions";
import util from "../util/util";
import { getTalksTopYear } from "./talk-getters";
import { TalkBasic } from "schema";

/**
 * Get top Talks
 */
export const talksTop = functions.https.onRequest(async (req, res) => {
  const [request, response, approved] = util.middleware(req, res, true, true);
  if (!approved) return response.status(403).send();
  const talks: TalkBasic[] = await getTalksTopYear();
  response.json(talks);
});
