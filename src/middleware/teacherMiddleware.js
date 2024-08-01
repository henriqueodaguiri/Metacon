const AppError = require("@/lib/appError");
const { default: roles } = require("@/lib/roles");

function verifyTeacherRole(tokenInfo) {
  if(tokenInfo.role !== roles.TEACHER) {
    throw new AppError("Não autorizado", 401);
  }
}

module.exports = {
  verifyTeacherRole
};