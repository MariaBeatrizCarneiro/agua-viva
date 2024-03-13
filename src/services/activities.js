import { getActivities, getMyClasses, getMyEvents, getClasses, getEvents, getEventById, getClassById } from "@/src/data/activities";

export async function loadActivities(){
    const activities = await getActivities()
    return activities
}
export async function loadClasses(id){
    const classes = await getClasses(id)
    return classes
}
export async function loadEvents(id){
    const events = await getEvents(id)
    return events
}

export async function loadMyClasses(id){
    const myClasses = await getMyClasses(id)
    return myClasses
}

export async function loadMyEvents(id){
    const myEvents = await getMyEvents(id)
    return myEvents
}

export async function loadEvent(eventId){
    const event = await getEventById(eventId)
    return event
}

export async function loadClass(classId){
    const class_ = await getClassById(classId)
    return class_
}