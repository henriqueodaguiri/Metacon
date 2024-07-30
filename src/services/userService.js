const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const create = async ({ name, email, password }) => {
  const emailAlreadyRegister = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (emailAlreadyRegister) {
    throw new AppError("E-mail informado já cadastrado!", 400);
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
};

module.exports = {
  getAllUsers,
  create
};
