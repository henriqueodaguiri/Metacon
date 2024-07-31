const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");
const bcrypt = require("bcrypt");

const getUserById = async (id) => {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  });

  return user;
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

const update = async ({ userId, name, email, old_password, new_password }) => {
  const checkEmail = await prisma.user.findFirst({
    where: {
      email,
      id: {
        not: userId
      }
    }
  });

  if(checkEmail) {
    throw new AppError("E-mail já registrado a outro usuário!");
  }

  const user = await getUserById(userId);
  let password = user.password;
  if(old_password && new_password) {
    const isPasswordValid = await bcrypt.compare(old_password, user.password);
    if(!isPasswordValid) {
      throw new AppError("Senha antiga não confere!");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(new_password, saltRounds);
    password = hashedPassword;
  }

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      email,
      password
    }
  });
};

module.exports = {
  create,
  update,
  getUserById
};
