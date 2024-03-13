const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb';

const collectionName = "activities"

async function getActivities() {
    const collection = await connectToCollection(collectionName)
    const result = await collection.find().toArray()
    return result
}

//EVENTS THAT THE USER IS NOT A PARTICIPANT - SUGGESTIONS
async function getEvents(id) {
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

async function getEventById(eventId){
    const collection = await connectToCollection(collectionName);
    const event = await collection.findOne({ _id: new ObjectId(eventId) });
    return event;
}

async function getClassById(classId){
    const collection = await connectToCollection(collectionName);
    const class_ = await collection.findOne({ _id: new ObjectId(classId) });
    return class_;
}


module.exports = { getActivities, getMyClasses, getClasses, getMyEvents, getEvents, getEventById, getClassById }