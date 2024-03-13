const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb';

const collectionName = "users"

export async function getUserById(id){
    const collection = await connectToCollection(collectionName);
    const event = await collection.findOne({ _id: new ObjectId(id) });
    return event;
}