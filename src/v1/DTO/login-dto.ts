import { User } from "@prisma/client"

export interface loginDTO {
    email: string,
    password: string
}


export interface UserLogin {
    user: Omit<User, "password">
    token: string
}