const userService = require("@/services/userService");
const createResponse = require("@/lib/responseHelper");

const create = async (req) => {
  const { name, email, password } = await req.json();
  await userService.create({ name, email, password });
  
  return createResponse({ status: 201 });
};

const update = async (req, userId) => {
  const { name, email, old_password, new_password } = await req.json();
  await userService.update({ userId, name, email, old_password, new_password });

  return createResponse({ status: 201 });
};

module.exports = {
  create,
  update
};
