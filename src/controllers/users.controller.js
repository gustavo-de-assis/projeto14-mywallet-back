import { sessionsCollection, usersCollection } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";


export async function signUpUser(req, res){
    const newUser = req.body;

    try{
        const user = await usersCollection.findOne({email: newUser.email});
        
        if(user){
            return res.status(409).send("User already exists!")
        }

        const hashPassword = bcrypt.hashSync(newUser.password, 10);
        await usersCollection.insertOne({...newUser, password: hashPassword});
        
        res.sendStatus(201);

    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}