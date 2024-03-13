import { loadMyClasses } from "@/src/services/activities";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const userClasses = await loadMyClasses(id);

    return res.status(200).json({ userClasses });
  } catch (error) {
    console.error('Error fetching user classes', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}