import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("Database connected!");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("myWalletDb");

export const usersCollection = db.collection("usersInfo");
export const transactionsCollection = db.collection("transactions");
export const sessionsCollection = db.collection("sessions");
