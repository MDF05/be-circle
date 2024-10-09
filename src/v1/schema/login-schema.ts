import { z } from "zod"

export const loginSchema = z.object({
    email: z.string({ message: "email must be string" }),
    password: z.string({ message: "passwrod must be string" }).min(4, "password must be at least 4 characters")

})


export type LoginSchema = z.infer<typeof loginSchema>