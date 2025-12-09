import * as z from "zod";

export const targetSchema = z.object({
    name: z.string().trim().nonempty("Обязательное поле").min(3, "Минимум 3 символа").max(250, "Максимум 250 символов"),
    is_active: z.boolean().optional(),
});

export type TargetSchemaType = z.infer<typeof targetSchema>;