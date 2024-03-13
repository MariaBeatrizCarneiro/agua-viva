import { loadMyEvents } from "@/src/services/activities";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const userEvents = await loadMyEvents(id);

    return res.status(200).json({ userEvents });
  } catch (error) {
    console.error('Error fetching user events', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}