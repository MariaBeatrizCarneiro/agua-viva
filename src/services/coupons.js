import { getAllMyCoupons, getMyRedeemableCoupons } from "@/src/data/coupons";

export async function loadAllMyCoupons(id){
    const myCoupons = await getAllMyCoupons(id)
    return myCoupons
}

export async function loadMyRedeemableCoupons(id){
    const myRedeemableCoupons = await getMyRedeemableCoupons(id)
    return myRedeemableCoupons
}