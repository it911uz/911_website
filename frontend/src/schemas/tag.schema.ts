import * as z from "zod";

export const tagSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(50, "Максимум 50 символов"),

    hex: z
        .string()
        .trim()
        .nonempty("Обязательное поле"),
});

export type TagSchemaType = z.infer<typeof tagSchema>;