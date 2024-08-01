const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");
import DiskStorage from "@/lib/diskStorage";
const difficulties = require("@/lib/difficulties");

const getByName = async (name) => {
  if(!name) {
    name = "";  
  }

  const texts = await prisma.text.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }
    },
    orderBy: {
        name: "asc"
      }
  });
  texts.map(x => x.difficulty = difficulties[x.difficulty]);

  return texts;
};

const getTextById = async (id) => {
  const text = await prisma.text.findFirst({
    where: {
      id
    }
  });

  return text;
};

const create = async ({ name, difficulty, content }) => {
  const textAlreadyRegister = await prisma.text.findFirst({
    where: {
      name
    }
  });

  if (textAlreadyRegister) {
    throw new AppError("Já existe um texto com esse nome!", 400);
  }

  const newText = await prisma.text.create({
    data: {
      name,
      difficulty,
      content
    }
  });

  return newText.id;
};

const update = async ({ id, name, difficulty, content }) => {
  const checkName = await prisma.text.findFirst({
    where: {
      name: name,
      id: {
        not: id
      }
    }
  });

  if(checkName) {
    throw new AppError("Esse nome já está vinculado a outro texto!");
  }

  await prisma.text.update({
    where: {
      id: id
    },
    data: {
      name: name,
      difficulty: difficulty,
      content: content
    }
  });
};

const updateCover = async ({ textId, file }) => {
  const text = await getTextById(textId);
  if(!text) {
    throw new AppError("Não existe texto com esse ID!", 400);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;
  const diskStorage = new DiskStorage();
  const uniqueFileName = await diskStorage.save(fileName, buffer);

  if(text.coverUrl) {
    diskStorage.delete(text.coverUrl);
  }

  await prisma.text.update({
    where: {
      id: textId
    },
    data: {
      coverUrl: uniqueFileName
    }
  });

  return uniqueFileName;
};

module.exports = {
  create,
  update,
  getTextById,
  updateCover,
  getByName
};
