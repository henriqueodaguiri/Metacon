import handleError from "@/lib/errorHandler";
import { getIdFromUrl } from "@/lib/urlHelper";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const textController = require("@/controllers/textController");

export async function PUT(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const textId = getIdFromUrl(req);

    return await textController.update(req, textId);
  } catch(error) {
    return handleError(error);
  }
}

export async function GET(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const textId = getIdFromUrl(req);

    return await textController.show(textId);
  } catch(error) {
    return handleError(error);
  }
}

export async function DELETE(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const textId = getIdFromUrl(req);

    return await textController.destroy(textId);
  } catch(error) {
    return handleError(error);
  }
}