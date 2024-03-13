//CLASSES THAT I'M STILL NOT A PARTICIPANT

import { loadClasses } from "@/src/services/activities";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const classes = await loadClasses(id);

    return res.status(200).json({ classes });
  } catch (error) {
    console.error('Error fetching classes', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}