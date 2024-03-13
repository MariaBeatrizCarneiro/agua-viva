import { getEventById } from "@/src/data/activities";

export default async function handler(req, res) {
  const { query: { eventId } } = req;

  try {
    const event = await getEventById(eventId)

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}