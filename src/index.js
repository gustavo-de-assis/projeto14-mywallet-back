import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.router.js";
import { transactionRouter } from "./routes/transaction.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(transactionRouter);
app.listen(5000, console.log("Server running at port 5000"));
