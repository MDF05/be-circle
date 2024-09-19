import { z } from "zod"

export const registerSchema = z.object({
    fullName: z.string({ message: "full name must be string" }),
    email: z.string({ message: "email must be string" }).email("invalid email address"),
    password: z.string({ message: "passwrod must be string" }).min(4, "password must be at least 4 characters")

})


export type RegisterSchema = z.infer<typeof registerSchema>