import * as z from "zod";

export const employSchema = z.object({
    full_name: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(50, "Максимум 50 символов"),

    username: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(50, "Максимум 50 символов"),

    email: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Введите корректную почту"
        ),

    role_id: z.number().min(1, "Выберите роль"),

    password: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(9, "Минимум 9 символов")
        .max(50, "Максимум 50 символов")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{9,}$/,
            "Пароль должен содержать минимум 9 символов, включая заглавные и строчные буквы, цифры и специальные символы"
        ).optional(),

    phone_number: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .regex(
            /^\+998(20|33|50|77|78|88|90|91|93|94|95|97|98|99)\d{7}$/,
            "Введите корректный номер телефона (пример: +998901234567)",
        ),
});

export type EmploySchemaType = z.infer<typeof employSchema>;
