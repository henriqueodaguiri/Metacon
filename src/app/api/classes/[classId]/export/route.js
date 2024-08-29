import handleError from "@/lib/errorHandler";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const classController = require("@/controllers/classController");

export async function GET(req, { params }) {
  try {
    const tokenInfo = verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const classId = Number(params.classId);

    return await classController.exportExcel(classId, tokenInfo.userId);
  } catch (error) {
    return handleError(error);
  }
}
