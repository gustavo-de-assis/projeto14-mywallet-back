import userService from "../services/auth.service.js";

export async function signUpUser(req, res) {
  const newUser = req.body;

  try {
    await userService.signUpUser(newUser);
    return res.sendStatus(200);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.status(409).send(error);
    }

    return res.sendStatus(500);
  }
}

export async function signInUser(req, res) {
  const data = req.body;
  try {
    const token = await userService.signInUser(data);
    return res.status(200).send({ token });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(404).send(error.message);
    }
    if (error.name === "UnauthorizedError") {
      return res.status(401).send(error.message);
    }
    return res.sendStatus(500);
  }
}

export async function getUser(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const user = await userService.getUser(token);
    return res.status(200).send(user);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(401).send(error.message);
    }
    return res.sendStatus(500);
  }
}
