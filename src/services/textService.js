import FireBaseStorage from "@/lib/fireBaseStorage";
const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");
const difficulties = require("@/lib/difficulties");
const { getImageNameFromFireBaseUrl } = require("@/lib/urlHelper");

const getByName = async (name) => {
  if(!name) {
    name = "";  
  }

  const texts = await prisma.text.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }, 
      active: true
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

  if(!text) {
    throw new AppError("Texto não encontrado!", 404);
  }

  const questions = await prisma.question.findMany({
    where: {
      textId: text.id
    }
  });

  for(const question of questions) {
    const choices = await prisma.choice.findMany({
      where: {
        questionId: question.id
      }
    });

    question.choices = choices;
  }

  const textObj = {
    text,
    questions
  };

  return textObj;
};

const create = async ({ name, difficulty, content, questions }) => {
  const result = await prisma.$transaction(async (prisma) => {
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

    for (const question of questions) {
      const newQuestion = await prisma.question.create({
        data: {
          statement: question.statement,
          textId: newText.id, 
        }
      });

      for(const choice of question.choices) {
        await prisma.choice.create({
          data: {
            questionId: newQuestion.id,
            isCorrect: choice.isCorrect,
            content: choice.content
          }
        });
      }
    }

    return newText.id;
  });

  return result;
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
  const fireBaseStorage = new FireBaseStorage();
  const uniqueFileName = await fireBaseStorage.save(fileName, buffer);

  if(text.coverUrl) {
    const fileDeleteName = getImageNameFromFireBaseUrl(text.coverUrl);
    fireBaseStorage.delete(fileDeleteName);
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
