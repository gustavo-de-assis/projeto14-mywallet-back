import { notFoundError } from "../errors/not-found-error.js";
import transactionRepository from "../repositories/transaction.repository.js";

async function createTransaction(data) {
  const { userId, transactionData } = data;
  await transactionRepository.insertTransaction({
    userId,
    ...transactionData,
  });
}

async function getUserTransactions(userId) {
  return await transactionRepository.findUserTransactions(userId);
}

async function deleteTransaction(data) {
  const { id, userId } = data;

  const transaction = await transactionRepository.findTransaction({
    id,
    userId,
  });

  if (!transaction) throw notFoundError();

  return await transactionRepository.deleteTransaction(transaction._id);
}

async function updateTransaction(data) {
  const { userId, id, updatedData } = data;

  const transaction = await transactionRepository.findTransaction({
    id,
    userId,
  });

  if (!transaction) throw notFoundError();
  const transactionId = transaction._id;
  return await transactionRepository.updateTransaction({
    id: transactionId,
    updatedData,
  });
}

const transactionService = {
  createTransaction,
  getUserTransactions,
  deleteTransaction,
  updateTransaction,
};

export default transactionService;
