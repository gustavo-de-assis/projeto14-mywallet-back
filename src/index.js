import express from "express";
import cors from "cors";
import { getUser, signInUser, signUpUser } from "./controllers/users.controller.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", signUpUser);
app.post("/sign-in", signInUser);
app.get("/userInfo", getUser);

app.listen(5000, console.log("Server running at port 5000"));