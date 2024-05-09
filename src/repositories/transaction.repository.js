import { ObjectId } from "mongodb";
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

async function findTransaction({ id, userId }) {
  return await transactionsCollection.findOne({
    _id: ObjectId(id),
    userId: userId,
  });
}

async function deleteTransaction(id) {
  await transactionsCollection.deleteOne({ _id: ObjectId(id) });
}

const transactionRepository = {
  insertTransaction,
  findUserTransactions,
  findTransaction,
  deleteTransaction,
};

export default transactionRepository;
