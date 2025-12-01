import * as z from "zod";

export const taskSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(250, "Максимум 250 символов"),

    description: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(1024, "Максимум 1024 символа"),
    status_id: z.number().min(1, "Выберите статус"),
    tags: z.array(z.number()).min(1, "Выберите хотя бы один тег"),
    users: z.array(z.number()).min(1, "Выберите хотя бы одного исполнителя"),
    deadline: z.string()
        .nonempty("Обязательное поле")
        .refine(val => !Number.isNaN(Date.parse(val)), "Неверный формат даты")
        .refine(val => new Date(val) >= new Date(), "Дата не может быть раньше текущей"),
});

export type TaskSchemaType = z.infer<typeof taskSchema>;

export const taskStatusSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(250, "Максимум 50 символов"),

    hex: z
        .string()
        .trim()
        .min(3, "Минимум 3 символа")
        .max(50, "Максимум 50 символов")
        .nonempty("Обязательное поле"),
    is_completed: z.boolean(),
});

export type TaskStatusSchemaType = z.infer<typeof taskStatusSchema>;

export const taskCommentSchema = z.object({
    comment: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа"),

    files: z
        .array(
            z
                .instanceof(File)
                .refine(
                    (file) =>
                        [
                            "image/jpeg",
                            "image/png",
                            "application/pdf",
                            "text/plain",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ].includes(file.type),
                    "Недопустимый тип файла",
                )
                .refine((file) => file.size <= 5 * 1024 * 1024, "Файл не должен превышать 5MB"),
        )
        .optional(),
});

export type TaskCommentSchemaType = z.infer<typeof taskCommentSchema>;