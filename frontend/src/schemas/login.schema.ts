import * as z from "zod";

export const loginSchema = z.object({
    username: z.string().trim().nonempty("Обязательное поле"),
    password: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(8, "Минимум 8 символов")
        .max(50, "Максимум 50 символов")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
            "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы"
        ),
});

export type LoginSchema = z.infer<typeof loginSchema>;