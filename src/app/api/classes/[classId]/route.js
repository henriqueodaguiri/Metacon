import handleError from "@/lib/errorHandler";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const classController = require("@/controllers/classController");

export async function PUT(req, { params }) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = Number(params.classId);

    return await classController.update(req, classId, tokenInfo.userId);
  } catch(error) {
    return handleError(error);
  }
}

export async function GET(req, { params }) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = Number(params.classId);

    return await classController.show(classId, tokenInfo.userId);
  } catch(error) {
    return handleError(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = Number(params.classId);

    return await classController.destroy(classId, tokenInfo.userId);
  } catch(error) {
    return handleError(error);
  }
}