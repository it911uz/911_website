import * as z from "zod";

export const changePasswordSchema = z.object({
    old_password: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(8, "Минимум 8 символов")
        .max(50, "Максимум 50 символов")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{9,}$/,
            "Пароль должен содержать минимум 9 символов, включая заглавные и строчные буквы, цифры и специальные символы"
        ),
    new_password: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(9, "Минимум 9 символов")
        .max(50, "Максимум 50 символов")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{9,}$/,
            "Пароль должен содержать минимум 9 символов, включая заглавные и строчные буквы, цифры и специальные символы"
        ),
});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;