const { authenticateUser } = require("@/services/authService");
const createResponse = require("@/lib/responseHelper");
const handleError = require("@/lib/errorHandler");
const EXPIRES_IN = process.env.EXPIRES_IN || "3600";

async function login(req) {
  try {
    const { email, password } = await req.json();
    const { user, token } = await authenticateUser(email, password);
    const response = createResponse({ user }); 
    response.headers.append("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=${EXPIRES_IN}`);

    return response;
  } catch (error) {
    return handleError(error);
  }
};

async function logout() {
  const response = createResponse({ message: "Logged out" }); 
  response.headers.append("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0");

  return response;
}

module.exports = {
  login,
  logout
};