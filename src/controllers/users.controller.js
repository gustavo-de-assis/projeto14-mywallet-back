import { sessionsCollection, usersCollection } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";


export async function signUpUser(req, res) {
    const newUser = req.body;

    try {
        const user = await usersCollection.findOne({ email: newUser.email });

        //User already exists...
        if (user) {
            return res.status(409).send("User already exists!")
        }

        const hashPassword = bcrypt.hashSync(newUser.password, 10);
        await usersCollection.insertOne({ ...newUser, password: hashPassword });

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function signInUser(req, res) {
    const { email, password } = req.body;
    const token = uuidV4();

    try {
        const user = await usersCollection.findOne({ email });
        //User not found!
        if (!user) {
            return res.sendStatus(401);
        }

        const validatePassword = bcrypt.compareSync(password, user.password);

        //Wrong password!
        if (!validatePassword) {
            return res.sendStatus(401);
        }

        await sessionsCollection.insertOne({
            token,
            userId: user._id
        })

        res.send({ token })

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

export async function getUser(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const sessions = await sessionsCollection.findOne({ token });
        console.log(sessions);

        const user = await usersCollection.findOne({ _id: sessions?.userId });

        delete user.password;

        res.send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}