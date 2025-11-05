import * as z from "zod";

export const loginSchema = z.object({
    username: z.string().trim().nonempty("Обязательное поле"),
    password: z.string().trim().nonempty("Обязательное поле"),
});

export type LoginSchema = z.infer<typeof loginSchema>;