const userController = require("@/controllers/userController");
const { verifyToken } = require("@/middleware/authMiddleware");
const errorHandler = require("@/lib/errorHandler");

export async function GET(req) {
  try {
    verifyToken(req);
    return userController.fetchUsers(req);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(req) {
  try {
    return await userController.create(req);
  } catch (error) {
    return errorHandler(error);
  }
}