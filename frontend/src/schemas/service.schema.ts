import * as z from "zod";

export const serviceSchema = z.object({
    name: z.string().trim().nonempty("Обязательное поле").min(3, "Минимум 3 символа").max(250, "Максимум 250 символов"),
    description: z.string().trim().nonempty("Обязательное поле").min(3, "Минимум 3 символа").max(1024, "Максимум 1024 символа"),
    price: z.number()
        .int("Цена должна быть целым числом")
        .gt(0, "Цена должна быть больше 0"),
    is_subscription: z.boolean(),
});

export type ServiceSchemaType = z.infer<typeof serviceSchema>;