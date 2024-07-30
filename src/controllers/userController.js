const userService = require("@/services/userService");
const createResponse = require("@/lib/responseHelper");

const fetchUsers = async (req) => {
  const users = await userService.getAllUsers();
  return createResponse({ body: users });
};

const create = async (req) => {
  const { name, email, password } = await req.json();
  await userService.create({ name, email, password });
  return createResponse({ status: 201 });
};

module.exports = {
  fetchUsers,
  create
};
