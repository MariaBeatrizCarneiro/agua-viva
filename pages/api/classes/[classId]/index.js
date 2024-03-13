import { getClassById } from "@/src/data/activities";

export default async function handler(req, res) {
  const { query: { classId } } = req;

  try {
    const class_ = await getClassById(classId)

    if (!class_) {
      return res.status(404).json({ message: 'Class not found' });
    }

    return res.status(200).json(class_);
  } catch (error) {
    console.error('Error fetching Class:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}