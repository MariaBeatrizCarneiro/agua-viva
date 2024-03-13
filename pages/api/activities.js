import { getActivities } from "@/src/data/activities";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const activities = await getActivities();
            console.log('Connected')

            res.status(200).json(activities);
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}