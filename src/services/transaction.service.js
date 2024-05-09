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

const transactionService = {
  createTransaction,
  getUserTransactions,
};

export default transactionService;
