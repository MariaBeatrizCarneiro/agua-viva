//USER PAGE - GET USER

import { loadUser } from "@/src/services/users";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const user = await loadUser(id);

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}