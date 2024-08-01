const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");
const bcrypt = require("bcrypt");
import DiskStorage from "@/lib/diskStorage";

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

const updateAvatar = async ({ userId, file }) => {
  const user = await getUserById(userId);
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;
  const diskStorage = new DiskStorage();
  const uniqueFileName = await diskStorage.save(fileName, buffer);

  if(user.avatarUrl) {
    diskStorage.delete(user.avatarUrl);
  }

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      avatarUrl: uniqueFileName
    }
  });

  return uniqueFileName;
};

module.exports = {
  create,
  update,
  getUserById,
  updateAvatar
};
