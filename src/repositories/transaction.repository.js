import { transactionsCollection } from "../database/db.js";

async function insertTransaction(data) {
  await transactionsCollection.insertOne({ ...data });
}

async function findUserTransactions(userId) {
  const transactions = await transactionsCollection
    .find({ userId: userId })
    .toArray();

  return transactions;
}
