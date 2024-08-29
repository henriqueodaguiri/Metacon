const classTextService = require("@/services/classTextService");
const createResponse = require("@/lib/responseHelper");

const show = async (classId, textId, userId) => {
  const classText = await classTextService.show(classId, textId, userId);
  return createResponse({ body: { classText }, status: 200 });
};

module.exports = {
  show
};
