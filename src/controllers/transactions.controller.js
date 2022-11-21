import { transactionsCollection, usersCollection } from "../database/db";

export async function postTransactions(req, res){
    //compare user id

    const {user} = req.headers;

    
    const validation = messageSchema.validate(req.body, { abortEarly: true });
    
    if(validation.error){
        res.sendStatus(422);
        return;
    }
    
    
    try {
        await transactionsCollection.insertOne(transaction)
        res.status(201).send("Success!")
    }
    catch(err) {
        res.status(500).send("Error!")
    }

}
export async function getTransactions(req, res){
    //compare user id
    try {
        const transactions = await transactionsCollection.find().toArray();
        res.send(transactions).status(200);
    }catch (err){
        res.sendStatus(500);
    }
}