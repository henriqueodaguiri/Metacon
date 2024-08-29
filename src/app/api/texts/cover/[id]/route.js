import handleError from "@/lib/errorHandler";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const textController = require("@/controllers/textController");

export async function PATCH(req, { params }) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const textId = Number(params.id);

    return await textController.updateCover(req, textId);
  } catch(error) {
    return handleError(error);
  }
}
