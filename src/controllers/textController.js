const textService = require("@/services/textService");
const createResponse = require("@/lib/responseHelper");
const AppError = require("@/lib/appError");

const index = async (req, name) => {
  const texts = await textService.getByName(name);
  return createResponse({ body: { texts: texts }, status: 201 });
};

const create = async (req) => {
  const { name, difficulty, content } = await req.json();
  if(!name || !difficulty|| !content) {
    throw new AppError("Dados obrigatórios não informados!", 400);
  }

  const id = await textService.create({ name, difficulty, content });
  return createResponse({ body: { id }, status: 201 });
};

const update = async (req) => {
  const { id, name, difficulty, content } = await req.json();
  if(!id || !name|| !difficulty|| !content) {
    throw new AppError("Dados obrigatórios não informados!", 400);
  }

  await textService.update({ id, name, difficulty, content });

  return createResponse({ status: 201 });
};

const updateCover = async (req, textId) => {
  const formData = await req.formData();
  const file = formData.get("cover");

  if(!file) {
    return createResponse({ body: { message: "Não foi enviado key 'cover'" }, status: 400 });
  }

  const uniqueFileName = await textService.updateCover({ textId, file });
  return createResponse({ body: { cover: uniqueFileName },status: 201 });
};

module.exports = {
  updateCover,
  create,
  update,
  index
};
