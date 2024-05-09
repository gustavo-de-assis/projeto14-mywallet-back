import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getUserTransactions,
} from "../controllers/transactions.controller.js";

const transactionRouter = Router();

transactionRouter.get("/transactions", getUserTransactions);
transactionRouter.post("/transaction", createTransaction);
transactionRouter.delete("/transaction/:id", deleteTransaction);
// update transaction

export { transactionRouter };
