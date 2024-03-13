const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb';

const collectionName = "activities"

async function getActivities() {
    const collection = await connectToCollection(collectionName)
    const result = await collection.find().toArray()
    return result
}

//EVENTS THAT THE USER IS NOT A PARTICIPANT - SUGGESTIONS
async function getEvents() {
    const collection = await connectToCollection(collectionName)
    const events = await collection.find({
        participants: { $nin: [id] },
        type: "event"
    }).toArray()
    return events
}

//CLASSES THAT THE USER IS NOT A PARTICIPANT - SUGGESTIONS
async function getClasses(id) {
    const collection = await connectToCollection(collectionName)
    const classes = await collection.find({
        participants: { $nin: [id] },
        type: "class"
    }).toArray()
    return classes
}

async function getMyClasses(id) {
    const collection = await connectToCollection(collectionName);
    const myClasses = await collection.find({
        participants: id,
        type: "class"
    }).toArray();

    return myClasses
}

async function getMyEvents(id) {
    const collection = await connectToCollection(collectionName);
    const myEvents = await collection.find({
        participants: id,
        type: "event"
    }).toArray();

    return myEvents
}
module.exports = { getActivities, getMyClasses, getClasses, getMyEvents, getEvents }