import * as z from "zod";

export const taskSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(250, "Максимум 50 символов"),

    description: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(1024, "Максимум 1024 символа"),
    deadline: z.date().min(new Date(), "Дата не может быть раньше текущего времени"),
    status_id: z.number().min(1, "Выберите статус"),
    tags: z.array(z.number()).min(1, "Выберите хотя бы один тег"),
    users: z.array(z.number()).min(1, "Выберите хотя бы одного исполнителя"),
});

export type TaskSchemaType = z.infer<typeof taskSchema>;