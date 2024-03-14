import { getAllMyCoupons, getCouponById, getMyRedeemableCoupons } from "@/src/data/coupons";

export async function loadAllMyCoupons(id){
    const myCoupons = await getAllMyCoupons(id)
    return myCoupons
}

export async function loadMyRedeemableCoupons(id){
    const myRedeemableCoupons = await getMyRedeemableCoupons(id)
    return myRedeemableCoupons
}

export async function loadCoupon(couponId){
    const coupon = await getCouponById(couponId)
    return coupon
}