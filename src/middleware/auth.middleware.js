import { unauthorizedError } from "../errors/unauthorized-error.js";
import userService from "../services/auth.service.js";

export async function authenticate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  try {
    const user = await userService.getUser(token);
    if (!user) {
      throw unauthorizedError();
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(401).send(error.message);
    }
    return res.sendStatus(500);
  }
}
