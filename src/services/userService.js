const prisma = require("@/lib/prisma");

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

module.exports = {
  getAllUsers,
};
