//enter/leave class by the user and update its points
import { getClassById } from "@/src/data/activities"
import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { classId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { participant } = req.body;
            const class_ = await getClassById(classId);
            const collection = await connectToCollection("activities");

            const isParticipant = class_.participants.includes(participant);

            let updatedParticipants;
            let pointsToEarn = 0;

            if (isParticipant) {
                updatedParticipants = class_.participants.filter(existingParticipant => existingParticipant !== participant);
                
                const userCollection = await connectToCollection("users");
                const user = await userCollection.findOne({ _id: new ObjectId(participant) });

                pointsToEarn = class_.pointsToEarn;
                const updatedPoints = user.points - pointsToEarn;

                await userCollection.updateOne(
                    { _id: new ObjectId(participant) },
                    { $set: { points: updatedPoints } }
                );
            } else {
                if (class_.participants.length >= class_.usersLimit) {
                    return res.status(400).json({ success: false, error: 'Class maximum size exceeded' });
                }

                updatedParticipants = [...class_.participants, participant];
                pointsToEarn = class_.pointsToEarn;

                const userCollection = await connectToCollection("users");
                const user = await userCollection.findOne({ _id: new ObjectId(participant) });

                const updatedPoints = user.points + pointsToEarn;

                await userCollection.updateOne(
                    { _id: new ObjectId(participant) },
                    { $set: { points: updatedPoints } }
                );
            }

            await collection.updateOne(
                { _id: new ObjectId(classId) },
                { $set: { participants: updatedParticipants } }
            );

            res.json({ success: true, pointsToEarn });
        } catch (error) {
            console.error('Error updating participants:', error);
            res.status(500).json({ success: false, error: 'Failed to update participants' });
        }
    }
}