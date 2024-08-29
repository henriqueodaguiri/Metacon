import handleError from "@/lib/errorHandler";
import { getIdFromUrl } from "@/lib/urlHelper";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const classController = require("@/controllers/classController");

export async function PUT(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = getIdFromUrl(req);

    return await classController.update(req, classId, tokenInfo.userId);
  } catch(error) {
    return handleError(error);
  }
}

export async function GET(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = getIdFromUrl(req);

    return await classController.show(classId, tokenInfo.userId);
  } catch(error) {
    return handleError(error);
  }
}

export async function DELETE(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = getIdFromUrl(req);

    return await classController.destroy(classId, tokenInfo.userId);
  } catch(error) {
    return handleError(error);
  }
}