import { User } from "@prisma/client";


export default interface UserTypesExtends extends User {
    fullName: string
}
