import * as z from "zod";

const STATUS_VALUES = ["active", "inactive", "pending"] as const;

export const companySchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(250, "Максимум 250 символов"),

    info: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(1024, "Максимум 1024 символа"),

    phone_number: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .regex(
            /^\+998(20|33|50|77|78|88|90|91|93|94|95|97|98|99)\d{7}$/,
            "Введите корректный номер телефона (пример: +998901234567)"
        ),

    status: z.enum(STATUS_VALUES, {
        message: "Некорректный статус",
    }),
});

export type CompanySchemaType = z.infer<typeof companySchema>;

export type CompanyStatusType = typeof STATUS_VALUES[number];


export const companyContactSchema = z.object({
    full_name: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(250, "Максимум 50 символов"),

    phone_number: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .regex(
            /^\+998(20|33|50|77|78|88|90|91|93|94|95|97|98|99)\d{7}$/,
            "Введите корректный номер телефона (пример: +998901234567)"
        ),
    email: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .regex(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Введите корректную почту",
        ),
    relation: z
        .string()
        .trim()
        .nonempty("Обязательное поле")
        .min(3, "Минимум 3 символа")
        .max(250, "Максимум 50 символов"),
});

export type CompanyContactSchemaType = z.infer<typeof companyContactSchema>;
