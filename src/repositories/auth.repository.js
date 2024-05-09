import { sessionsCollection, usersCollection } from "../database/db.js";

async function signUser(data) {
  await usersCollection.insertOne({ ...data });
}

async function findUserByEmail(email) {
  const user = await usersCollection.findOne({ email });
  return user;
}

async function findUserById(id) {
  const user = await usersCollection.findOne({ _id: id });
  return user;
}

async function newSession(data) {
  const { token, user } = data;
  await sessionsCollection.insertOne({ token, userId: user._id });
}

async function findSession(token) {
  const session = await sessionsCollection.findOne({ token });
  return session;
}

const userRepository = {
  signUser,
  findUserById,
  findUserByEmail,
  newSession,
  findSession,
};

export default userRepository;
