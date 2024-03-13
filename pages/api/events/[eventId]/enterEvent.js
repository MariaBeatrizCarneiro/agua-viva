//enter/leave event by the user and update his points
import { getEventById } from "@/src/data/activities"
import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { eventId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { participant } = req.body;
            const event = await getEventById(eventId);
            const collection = await connectToCollection("activities");

            const isParticipant = event.participants.includes(participant);

            let updatedParticipants;
            let pointsToEarn = 0;

            if (isParticipant) {
                updatedParticipants = event.participants.filter(existingParticipant => existingParticipant !== participant);
                
                const userCollection = await connectToCollection("users");
                const user = await userCollection.findOne({ _id: new ObjectId(participant) });

                pointsToEarn = event.pointsToEarn;
                const updatedPoints = user.points - pointsToEarn;

                await userCollection.updateOne(
                    { _id: new ObjectId(participant) },
                    { $set: { points: updatedPoints } }
                );
            } else {
                if (event.participants.length >= event.usersLimit) {
                    return res.status(400).json({ success: false, error: 'Event maximum size exceeded' });
                }

                updatedParticipants = [...event.participants, participant];
                pointsToEarn = event.pointsToEarn;

                const userCollection = await connectToCollection("users");
                const user = await userCollection.findOne({ _id: new ObjectId(participant) });

                const updatedPoints = user.points + pointsToEarn;

                await userCollection.updateOne(
                    { _id: new ObjectId(participant) },
                    { $set: { points: updatedPoints } }
                );
            }

            await collection.updateOne(
                { _id: new ObjectId(eventId) },
                { $set: { participants: updatedParticipants } }
            );

            res.json({ success: true, pointsToEarn });
        } catch (error) {
            console.error('Error updating participants:', error);
            res.status(500).json({ success: false, error: 'Failed to update participants' });
        }
    }
}