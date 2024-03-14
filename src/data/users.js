const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb';

const collectionName = "users"

export async function getUserById(id){
    const collection = await connectToCollection(collectionName);
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user;
}

export async function getUsers(){
    const collection = connectToCollection(collectionName)
    const users = await collection.find().toArray
    return users
}