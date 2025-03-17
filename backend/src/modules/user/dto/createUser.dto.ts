import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty().min(5),
    username: z.string().nonempty()
})

export type CreateUserDto = z.infer<typeof createUserSchema>;