import { parse } from "url";
import AppError from "./appError";

function getIdFromUrl(req) {
  const parsedUrl = parse(req.url, true);
  const pathParts = parsedUrl.pathname.split("/");
  const id = Number(pathParts[pathParts.length - 1]);

  if(!id) {
    throw new AppError("Id informado inválido!", 400);
  }
  return id;
}

function getImageNameFromFireBaseUrl(firebaseUrl) {
  const regex = /\/o\/[^%]*%2F([^?]*)/;
  const match = firebaseUrl.match(regex);
  return match ? decodeURIComponent(match[1]) : null;
}

module.exports = { 
  getIdFromUrl,
  getImageNameFromFireBaseUrl
};
