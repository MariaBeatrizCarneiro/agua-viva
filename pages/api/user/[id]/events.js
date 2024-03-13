//EVENTS THAT I'M STILL NOT A PARTICIPANT

import { loadEvents } from "@/src/services/activities";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const events = await loadEvents(id);

    return res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}