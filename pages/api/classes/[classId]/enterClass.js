//enter class by the user
import { getClassById } from "@/src/data/activities"
import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { classId } = req.query;

    if (req.method === 'PATCH') {
        try {
            const { participant } = req.body;
            const class_ = await getClassById(classId);
            const collection = await connectToCollection("activities")

            const isParticipant = class_.participants.includes(participant);

            let updatedParticipants;
            if (isParticipant) {
                updatedParticipants = class_.participants.filter(existingParticipant => existingParticipant !== participant);
            } else {
                if (class_.participants.length < class_.usersLimit) {
                    updatedParticipants = [...class_.participants, participant];
                } else {
                    return res.status(400).json({ success: false, error: 'Class maximum size exceeded' });
                }
            }

            await collection.updateOne(
                { _id: new ObjectId(classId) },
                { $set: { participants: updatedParticipants } }
            );

            res.json({ success: true });
        } catch (error) {
            console.error('Error updating participants:', error);
            res.status(500).json({ success: false, error: 'Failed to update participants' });
        }
    }
}