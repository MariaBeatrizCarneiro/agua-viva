import { loadMyRedeemableCoupons } from "@/src/services/coupons";


export default async function handler(req, res) {
  const { id } = req.query;

  try {
    
    const userRedeemableCoupons = await loadMyRedeemableCoupons(id);

    return res.status(200).json({ userRedeemableCoupons });
  } catch (error) {
    console.error('Error fetching user redeemable coupons', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}