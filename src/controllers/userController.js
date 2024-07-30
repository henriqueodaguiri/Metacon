const { getAllUsers } = require("@/services/userService");
const createResponse = require("@/lib/responseHelper");
const handleError = require("@/lib/errorHandler");

const fetchUsers = async (req) => {
  try {
    const users = await getAllUsers();
    return createResponse(users);
  } catch (error) {
    return handleError(error);
  }
};

module.exports = {
  fetchUsers,
};
