const { connectToCollection } = require("./mongodb");
import { ObjectId } from 'mongodb';

const collectionName = "coupons"

async function getAllMyCoupons(id) {
    const collection = await connectToCollection(collectionName);
    const myCoupons = await collection.find({
        userId: id,
    }).toArray();

    return myCoupons
}

async function getMyRedeemableCoupons(id) {
    const collection = await connectToCollection(collectionName);
    const userCollection = await connectToCollection("users");

    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    const userPoints = user.points;

    const myRedeemableCoupons = await collection.find({
        userId: id,
        pointsRequired: { $lte: userPoints }
    }).toArray();

    return myRedeemableCoupons;
}

async function getCouponById(couponId){
    const collection = await connectToCollection(collectionName);
    const coupon = await collection.findOne({ _id: new ObjectId(couponId) });
    return coupon;
}

module.exports = { getAllMyCoupons, getMyRedeemableCoupons, getCouponById }