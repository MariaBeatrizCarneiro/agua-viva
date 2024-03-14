import { getUserById, getUsers } from "@/src/data/users";

export async function loadUser(id){
    const user = await getUserById(id)
    return user
}

export async function loadUsers(){
    const users = await getUsers()
    return users
}