import handleError from "@/lib/errorHandler";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const classController = require("@/controllers/classController");

export async function DELETE(req, { params }) {
  try {
    const tokenInfo = verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = Number(params.classId);
    const textId = Number(params.textId);

    return await classController.removeText(classId, textId, tokenInfo.userId);
  } catch(error) {
    return handleError(error);
  }
}

export async function POST(req, { params }) {
  try {
    const tokenInfo = verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = Number(params.classId);
    const textId = Number(params.textId);

    return await classController.addText(classId, textId, tokenInfo.userId);
  } catch(error) {
    return handleError(error);
  }
}