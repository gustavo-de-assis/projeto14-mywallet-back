import { notFoundError } from "../errors/not-found-error.js";
import transactionRepository from "../repositories/transaction.repository.js";
import userService from "./auth.service.js";

async function createTransaction(data) {
  const { token, transactionData } = data;
  const user = await userService.getUser(token);

  await transactionRepository.insertTransaction({
    userId: user._id,
    ...transactionData,
  });
}

async function getUserTransactions(token) {
  const user = await userService.getUser(token);

  return await transactionRepository.findUserTransactions(user._id);
}

async function deleteTransaction(data) {
  const { token, id } = data;
  const user = await userService.getUser(token);

  const transaction = await transactionRepository.findTransaction({
    id,
    userId: user._id,
  });

  if (!transaction) throw notFoundError();

  return await transactionRepository.deleteTransaction(transaction._id);
}

const transactionService = {
  createTransaction,
  getUserTransactions,
  deleteTransaction,
};

export default transactionService;
