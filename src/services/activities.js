import { getActivities, getMyClasses, getMyEvents, getClasses, getEvents } from "@/src/data/activities";

export async function loadActivities(){
    const activities = await getActivities()
    return activities
}
export async function loadClasses(id){
    const classes = await getClasses()
    return classes
}
export async function loadEvents(id){
    const events = await getEvents()
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