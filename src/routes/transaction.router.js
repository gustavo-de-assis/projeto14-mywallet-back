import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getUserTransactions,
  updateTransaction,
} from "../controllers/transactions.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.use(authenticate);

transactionRouter.get("/transactions", getUserTransactions);
transactionRouter.post("/transaction", createTransaction);
transactionRouter.delete("/transaction/:id", deleteTransaction);
transactionRouter.put("/transaction/:id", updateTransaction);

export { transactionRouter };
