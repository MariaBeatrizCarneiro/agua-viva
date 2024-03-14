const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb';

const collectionName = "activities";
const currentDate = new Date();

async function getActivities() {
    const collection = await connectToCollection(collectionName);
    const result = await collection.find({ date: { $gt: currentDate } }).sort({ date: 1 }).toArray();
    return result;
}

async function getEvents(id) {
    const collection = await connectToCollection(collectionName);
    const events = await collection.find({
        participants: { $nin: [id] },
        type: "event",
        date: { $gt: currentDate }
    }).sort({ date: 1 }).toArray();
    return events;
}

async function getClasses(id) {
    const collection = await connectToCollection(collectionName);
    const classes = await collection.find({
        participants: { $nin: [id] },
        type: "class",
        date: { $gt: currentDate }
    }).sort({ date: 1 }).toArray();
    return classes;
}

async function getMyClasses(id) {
    const collection = await connectToCollection(collectionName);
    const myClasses = await collection.find({
        participants: id,
        type: "class",
        date: { $gt: currentDate }
    }).sort({ date: 1 }).toArray();
    return myClasses;
}

async function getMyEvents(id) {
    const collection = await connectToCollection(collectionName);
    const myEvents = await collection.find({
        participants: id,
        type: "event",
        date: { $gt: currentDate }
    }).sort({ date: 1 }).toArray();
    return myEvents;
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