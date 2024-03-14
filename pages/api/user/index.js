import { loadUsers } from "@/src/services/users";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await loadUsers();

            res.status(200).json(users);
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}