import handleError from "@/lib/errorHandler";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const classController = require("@/controllers/classController");

export async function DELETE(req, { params }) {
  try {
    const tokenInfo = verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = Number(params.classId);
    const studentId = Number(params.studentId);

    return await classController.removeStudent(classId, studentId, tokenInfo.userId);
  } catch(error) {
    return handleError(error);
  }
}