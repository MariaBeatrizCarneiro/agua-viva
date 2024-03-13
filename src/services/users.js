import { getUserById } from "@/src/data/users";

export async function loadUser(id){
    const user = await getUserById(id)
    return user
}