const { login, logout } = require("@/controllers/authController");

export async function POST(req) {
  return login(req);
}

export async function DELETE(req) {
  return logout(req);
}