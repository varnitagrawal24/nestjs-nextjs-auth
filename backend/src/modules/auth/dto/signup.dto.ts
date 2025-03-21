import { createUserSchema } from "src/modules/user/dto/createUser.dto";
import { z } from "zod";

export const signUpSchema = createUserSchema.extend({})

export type SignUpDto = z.infer<typeof signUpSchema>