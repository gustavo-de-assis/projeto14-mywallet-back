import transactionService from "../services/transaction.service.js";

export async function createTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const transactionData = req.body;

  try {
    await transactionService.createTransaction({ token, transactionData });
    return res.status(201).send("Transaction created!");
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(401).send(error.message);
    }
    return res.sendStatus(500);
  }
}

export async function getUserTransactions(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const transactions = await transactionService.getUserTransactions(token);
    return res.status(200).send(transactions);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(401).send(error.message);
    }
    return res.sendStatus(500);
  }
}
