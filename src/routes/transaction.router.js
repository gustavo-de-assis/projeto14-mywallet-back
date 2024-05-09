import { Router } from "express";
import {
  createTransaction,
  getUserTransactions,
} from "../controllers/transactions.controller.js";

const transactionRouter = Router();

transactionRouter.get("/transactions", getUserTransactions);
transactionRouter.post("/transaction", createTransaction);

export { transactionRouter };
