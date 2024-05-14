import transactionService from "../services/transaction.service.js";

export async function createTransaction(req, res) {
  const transactionData = req.body;
  const userId = req.user._id;
  try {
    await transactionService.createTransaction({ transactionData, userId });
    return res.status(201).send("Transaction created!");
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getUserTransactions(req, res) {
  const userId = req.user._id;
  try {
    const transactions = await transactionService.getUserTransactions(userId);
    return res.status(200).send(transactions);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function deleteTransaction(req, res) {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    await transactionService.deleteTransaction({ id, userId });
    return res.status(200).send("Deleted!");
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(404).send(error.message);
    }
    return res.sendStatus(500);
  }
}

export async function updateTransaction(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  const userId = req.user._id;

  try {
    await transactionService.updateTransaction({ userId, id, updatedData });
    return res.status(201).send("Updated Transaction!");
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(404).send(error.message);
    }
    return res.sendStatus(500);
  }
}
