import handleError from "@/lib/errorHandler";
import { getIdFromUrl } from "@/lib/urlHelper";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const textController = require("@/controllers/textController");

export async function PATCH(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const textId = getIdFromUrl(req);

    return await textController.updateCover(req, textId);
  } catch(error) {
    return handleError(error);
  }
}
