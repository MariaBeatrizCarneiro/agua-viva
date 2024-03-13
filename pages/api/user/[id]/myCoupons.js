import { loadAllMyCoupons } from "@/src/services/coupons";


export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const userCoupons = await loadAllMyCoupons(id);

    return res.status(200).json({ userCoupons });
  } catch (error) {
    console.error('Error fetching user coupons', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}