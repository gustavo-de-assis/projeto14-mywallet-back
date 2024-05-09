import { transactionsCollection } from "../database/db.js";

async function insertTransaction(data) {
  await transactionsCollection.insertOne({ ...data });
}
