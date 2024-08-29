const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");

const show = async (classId, textId, studentId) => {
  let done = false; 
  const classText = await prisma.classText.findFirst({
    where: {
      classId,
      textId
    }
  });

  if(!classText) {
    throw new AppError("Texto não encontrado!", 404);
  }

  const text = await prisma.text.findFirst({
    where: {
      id: textId
    }
  });

  const questions = await prisma.question.findMany({
    where: {
      textId: text.id,
      active: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  for(const question of questions) {
    const choices = await prisma.choice.findMany({
      where: {
        questionId: question.id
      }
    });

    question.choices = choices;
    const answer = await prisma.answer.findFirst({
      where: {
        questionId: question.id,
        studentId
      }
    });

    if(answer) {
      done = true;
      question.selectedChoiceId = answer.choiceId;
    }
  }

  const textObj = {
    done,
    text,
    questions
  };

  return textObj;
};

module.exports = {
  show
};
