import { v4 as uuidV4 } from "uuid";
import userRepository from "../repositories/auth.repository.js";
import bcrypt from "bcrypt";
import { unauthorizedError } from "../errors/unauthorized-error.js";
import { notFoundError } from "../errors/not-found-error.js";
import { conflictError } from "../errors/conflict-error.js";

async function signInUser(data) {
  const { email, password } = data;
  const token = uuidV4();

  const user = await userRepository.findUserByEmail(email);
  if (!user) throw notFoundError();

  const validatePassword = bcrypt.compareSync(password, user.password);

  if (!validatePassword) throw unauthorizedError();

  await userRepository.newSession({ user, token });

  return token;
}

async function signUpUser(data) {
  const user = await userRepository.findUserByEmail(data.email);

  if (user) throw conflictError();

  const hashPassword = bcrypt.hashSync(data.password, 10);
  await userRepository.signUser({ ...data, password: hashPassword });
}

async function getUser(token) {
  const session = await userRepository.findSession(token);
  if (!session) throw unauthorizedError();

  const user = await userRepository.findUserById(session.userId);

  delete user.password;

  return user;
}

const userService = {
  signInUser,
  signUpUser,
  getUser,
};

export default userService;
