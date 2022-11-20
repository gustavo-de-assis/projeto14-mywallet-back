import express from "express";
import cors from "cors";
import { signUpUser } from "./controllers/users.controller.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-up", signUpUser);

app.listen(5000, console.log("Server running at port 5000"));