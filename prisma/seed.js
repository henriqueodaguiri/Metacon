const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function createUsers() {
  const saltRounds = 10;
  const password = "123";
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const teacher = await prisma.user.create({
    data: {
      email: "teacher@example.com",
      name: "Teacher One",
      password: hashedPassword,
      role: "TEACHER",
    },
  });

  for (let i = 1; i <= 20; i++) {
    await prisma.user.create({
      data: {
        email: `student${i}@example.com`,
        name: `Student ${i}`,
        password: hashedPassword,
      },
    });
  }
}

async function createClasses() {
  const teacher = await prisma.user.findFirst({
    where: {
      email: "teacher@example.com",
    },
  });

  for (let i = 1; i <= 2; i++) {
    const newClass = await prisma.class.create({
      data: {
        name: `Class ${i}`,
        teacherId: teacher.id,
      },
    });

    for (let j = 1; j <= 10; j++) {
      const studentEmail = `student${(i - 1) * 10 + j}@example.com`;
      const student = await prisma.user.findFirst({
        where: {
          email: studentEmail,
        },
      });

      await prisma.classUser.create({
        data: {
          classId: newClass.id,
          studentId: student.id,
        },
      });
    }
  }
}

async function createText() {
  const newText = await prisma.text.create({
    data: {
      name: "Sample Text",
      content: "This is a sample text content.",
      difficulty: "REGULAR",
    },
  });

  const classes = await prisma.class.findMany();

  for (const cls of classes) {
    await prisma.classText.create({
      data: {
        classId: cls.id,
        textId: newText.id,
      },
    });
  }
}

async function createQuestions() {
  const text = await prisma.text.findFirst({
    where: {
      name: "Sample Text",
    },
  });

  let choiceId = 0;
  for (let i = 1; i <= 5; i++) {
    const question = await prisma.question.create({
      data: {
        textId: text.id,
        statement: `Sample question ${i} about the text.`,
      },
    });

    for (let j = 1; j <= 5; j++) {
      choiceId++;
      const isCorrect = j === 1; 
      await prisma.choice.create({
        data: {
          questionId: question.id,
          isCorrect,
          content: `Choice ${choiceId} content.`,
        },
      });
    }
  }
}

async function createAnswers() {
  const students = await prisma.user.findMany({
    where: {
      id: {
        in: Array.from({ length: 15 }, (_, i) => i + 2), // user_id 2 to 16
      },
    },
  });

  const questions = await prisma.question.findMany();

  for (const student of students) {
    for (const question of questions) {
      const choices = await prisma.choice.findMany({
        where: {
          questionId: question.id,
        },
      });
      const selectedChoice = choices[0];
      await prisma.answer.create({
        data: {
          questionId: question.id,
          choiceId: selectedChoice.id,
          studentId: student.id,
        },
      });
    }
  }
}

async function createPerformance() {
  const students = await prisma.user.findMany({
    where: {
      id: {
        in: Array.from({ length: 15 }, (_, i) => i + 2), // user_id 2 to 16
      },
      role: "STUDENT",
    },
  });

  const texts = await prisma.text.findMany();

  for (const student of students) {
    for (const text of texts) {
      const questions = await prisma.question.findMany({
        where: {
          textId: text.id,
        },
      });

      let totalValue = 0;

      for (const question of questions) {
        const answer = await prisma.answer.findFirst({
          where: {
            questionId: question.id,
            studentId: student.id,
          },
        });

        if (answer) {
          const choice = await prisma.choice.findFirst({
            where: {
              id: answer.choiceId,
              isCorrect: true,
            },
          });

          if (choice) {
            totalValue += 2;
          }
        }
      }

      await prisma.performance.create({
        data: {
          studentId: student.id,
          textId: text.id,
          value: totalValue,
        },
      });
    }
  }
}

async function main() {
  await createUsers();
  await createClasses();
  await createText();
  await createQuestions();
  await createAnswers();
  await createPerformance();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
