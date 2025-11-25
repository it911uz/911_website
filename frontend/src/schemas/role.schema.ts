import * as z from "zod";

export const roleSchema = z.object({
    name: z.string().trim().nonempty("Обязательное поле").min(3, "Минимум 3 символа").max(250, "Максимум 250 символов"),
    permissions: z.array(z.string()).min(1, "Выберите хотя бы одно право").optional(),
});

export type RoleSchemaType = z.infer<typeof roleSchema>;