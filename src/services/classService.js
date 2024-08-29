import generateRandomCode from "@/lib/generateRandomCode";
import roles from "@/lib/roles";
const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");

const getByName = async (name, userId) => {
  if(!name) {
    name = "";  
  }

  const classes = await prisma.class.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }, 
      active: true,
      teacherId: userId
    },
    orderBy: {
      name: "asc"
    }
  });

  return classes;
};

const deleteById = async (id, userId) => {
  const classroom = await prisma.class.findFirst({
    where: {
      id
    }
  });

  if(!classroom) {
    throw new AppError("Turma não encontrada!", 404);
  }

  if(classroom.teacherId !== userId) {
    throw new AppError("Você não é o professor da turma!", 404);
  }

  await prisma.class.update({
    where: {
      id: classroom.id
    },
    data: {
      active: false
    }
  });
};

const removeStudent = async (classId, studentId, teacherId) => {
  const classroom = await prisma.class.findFirst({
    where: {
      id: classId
    }
  });

  if(!classroom) {
    throw new AppError("Turma não encontrada!", 404);
  }

  if(classroom.teacherId !== teacherId) {
    throw new AppError("Você não é o professor da turma!", 404);
  }

  const student = await prisma.user.findFirst({
    where: {
      id: studentId,
      role: roles.STUDENT
    }
  });

  if(!student) {
    throw new AppError("Aluno não encontrado!", 404);
  }

  const classUser = await prisma.classUser.findFirst({
    where: {
      classId,
      studentId
    }
  });

  if(!classUser) {
    throw new AppError("Aluno não faz parte da turma!", 404);
  }
  
  await prisma.classUser.delete({
    where: {
      classId_studentId: {
        classId,
        studentId
      }
    }
  });
};

const removeText = async (classId, textId, teacherId) => {
  const classroom = await prisma.class.findFirst({
    where: {
      id: classId
    }
  });

  if(!classroom) {
    throw new AppError("Turma não encontrada!", 404);
  }

  if(classroom.teacherId !== teacherId) {
    throw new AppError("Você não é o professor da turma!", 404);
  }

  const text = await prisma.text.findFirst({
    where: {
      id: textId
    }
  });

  if(!text) {
    throw new AppError("Texto não encontrado!", 404);
  }

  const classText = await prisma.classText.findFirst({
    where: {
      classId,
      textId
    }
  });

  if(!classText) {
    throw new AppError("Texto não faz parte da turma!", 404);
  }

  const performances = await prisma.performance.findFirst({
    where: {
      textId,
      classId
    }
  });

  if(performances) {
    throw new AppError("Não é possível excluir pois já houveram respostas!", 404);
  }

  await prisma.classText.delete({
    where: {
      classId_textId: {
        classId,
        textId
      }
    }
  });
};

const addText = async (classId, textId, teacherId) => {
  const classroom = await prisma.class.findFirst({
    where: {
      id: classId
    }
  });

  if(!classroom) {
    throw new AppError("Turma não encontrada!", 404);
  }

  if(classroom.teacherId !== teacherId) {
    throw new AppError("Você não é o professor da turma!", 404);
  }

  const text = await prisma.text.findFirst({
    where: {
      id: textId
    }
  });

  if(!text) {
    throw new AppError("Texto não encontrado!", 404);
  }

  const classText = await prisma.classText.findFirst({
    where: {
      classId,
      textId
    }
  });

  if(classText) {
    throw new AppError("Texto já faz parte da turma!", 404);
  }

  await prisma.classText.create({
    data: {
      classId,
      textId
    }
  });
};

const getById = async (id, userId) => {
  const classroom = await prisma.class.findFirst({
    where: {
      id: id
    },
    select: {
      id: true,
      accessKey: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      active: true,
      teacher: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      classUser: {
        select: {
          student: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              grade: true,
              performances: {
                where: {
                  classId: id 
                },
                select: {
                  id: true,
                  grade: true,
                  classText: {
                    select: {
                      text: {
                        select: {
                          id: true,
                          name: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      classText: {
        select: {
          text: {
            select: {
              id: true,
              name: true,
              difficulty: true,
              coverUrl: true
            }
          }
        }
      }
    }
  });

  if (!classroom) {
    throw new AppError("Turma não encontrada!", 404);
  }

  if (classroom.teacher.id !== userId) {
    throw new AppError("Você não é o professor dessa turma!", 404);
  }

  const students = classroom.classUser.map(x => {
    const performances = x.student.performances.map(performance => ({
      id: performance.id,
      grade: performance.grade,
      text: performance.classText.text 
    }));
    return {
      ...x.student,
      performances
    };
  });
  students.sort((a, b) => a.name.localeCompare(b.name));
  const texts = classroom.classText.map(x => x.text);
  texts.sort((a, b) => a.name.localeCompare(b.name));
  delete classroom.classUser; 
  delete classroom.classText; 

  return {
    ...classroom,
    texts,
    students
  };
};

const validateName = async(id, name) => {
  let classroom;
  if(id) {
    classroom = await prisma.class.findFirst({
      where: {
        name: name,
        active: true,
        id: {
          not: id
        }
      }
    });
  } else {
    classroom = await prisma.class.findFirst({
      where: {
        name,
        active: true,
      }
    });
  }

  if(classroom) {
    throw new AppError("Esse nome já está vinculado a outra turma!");
  }
};

const create = async ({ name, userId: teacherId }) => {
  const teacher = await prisma.user.findFirst({
    where: {
      id: teacherId,
      role: roles.TEACHER
    }
  });

  if(!teacher) {
    throw new AppError("Professor inválido!");
  }

  await validateName(null, name);

  const accessKey = generateRandomCode(8);
  const newClass = await prisma.class.create({
    data: {
      name,
      teacherId,
      accessKey
    }
  });

  return newClass;
};

const update = async ({ id, name, userId }) => {
  await validateName(id, name);
  const classroom = await prisma.class.findUnique({
    where: {
      id
    }
  });

  if(!classroom) {
    throw new AppError("Turma não encontrada!");
  }

  if(classroom.teacherId !== userId) {
    throw new AppError("Você não é o professor da turma!", 404);
  }

  await prisma.class.update({
    where: {
      id: id
    },
    data: {
      name: name
    }
  });
};

module.exports = {
  create,
  update,
  getById,
  getByName,
  deleteById,
  removeStudent,
  removeText,
  addText
};
