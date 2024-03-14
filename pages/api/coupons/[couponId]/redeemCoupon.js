import { loadUser } from "@/src/services/users";
import { loadCoupon } from "@/src/services/coupons";
import { connectToCollection } from "@/src/data/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { couponId } = req.query;

    if (req.method === 'PATCH') {
        const { userId } = req.body;

        try {
            const user = await loadUser(userId);
            const couponToUpdate = await loadCoupon(couponId);

            if (!user || !couponToUpdate) {
                return res.status(404).json({ success: false, message: 'Coupon or user not found' });
            }

            if (user.points < couponToUpdate.pointsRequired) {
                return res.status(400).json({ success: false, message: 'Insufficient points to redeem the coupon' });
            }

            // Calculate updated user points
            const updatedUserPoints = user.points - couponToUpdate.pointsRequired;

            // Update coupon's redeemed status to true in the database
            const collection = await connectToCollection("coupons");
            await collection.updateOne(
                { _id: new ObjectId(couponToUpdate._id) },
                { $set: { redeemed: true } }
            );

            const userCollection = await connectToCollection("users");
            await userCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: { points: updatedUserPoints } }
            );

            res.status(200).json({ success: true, message: 'Coupon redeemed successfully', userPoints: updatedUserPoints });
        } catch (error) {
            console.error('Error redeeming coupon:', error);
            res.status(500).json({ success: false, message: 'Failed to redeem coupon' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}