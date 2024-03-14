import { getCouponById } from "@/src/data/coupons";

export default async function handler(req, res) {
  const { query: { couponId } } = req;

  try {
    const coupon = await getCouponById(couponId)

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    return res.status(200).json(coupon);
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}