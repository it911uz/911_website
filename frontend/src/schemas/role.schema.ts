import * as z from "zod";

export const roleSchema = z.object({
    name: z.string().trim().nonempty("Обязательное поле").min(3, "Минимум 3 символа").max(250, "Максимум 250 символов"),
});

export type RoleSchemaType = z.infer<typeof roleSchema>;