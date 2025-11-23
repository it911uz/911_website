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

export const companyCommentSchema = z.object({
    comment: z.string().trim().nonempty("Обязательное поле").min(3, "Минимум 3 символа").max(1024, "Максимум 1024 символа"),
});

export type CompanyCommentSchemaType = z.infer<typeof companyCommentSchema>;

export const PAYMENT_TYPES = [
    { label: "Одноразово", value: "one_time" },
    { label: "Ежемесячно", value: "monthly" },
    { label: "Ежегодно", value: "annually" },
] as const;

export const PAYMENT_TYPE_VALUES = PAYMENT_TYPES.map(t => t.value) as [
    string,
    ...string[]
];

export type PaymentType = typeof PAYMENT_TYPE_VALUES[number];

export const companySubscriptionSchema = z.object({
    service_id: z.number()
        .int("Цена должна быть целым числом")
        .gt(0, "Цена должна быть больше 0"),

    payment_type: z.enum(PAYMENT_TYPE_VALUES, {
        message: "Некорректный тип оплаты",
    }),

    next_payment_due: z.string()
        .nonempty("Обязательное поле")
        .refine(val => !Number.isNaN(Date.parse(val)), "Неверный формат даты").optional(),

    price: z.number()
        .int("Цена должна быть целым числом")
        .gt(0, "Цена должна быть больше 0"),

    start_date: z.string()
        .nonempty("Обязательное поле")
        .refine(val => !Number.isNaN(Date.parse(val)), "Неверный формат даты"),

    end_date: z.string()
        .refine(val => !Number.isNaN(Date.parse(val)), "Неверный формат даты")
        .optional()
}).refine((data) => {
    if (!data.end_date) return true;
    return new Date(data.end_date) >= new Date(data.start_date);
}, {
    message: "end_date не может быть раньше start_date",
    path: ["end_date"]
});

export type CompanySubscriptionSchemaType = z.infer<typeof companySubscriptionSchema>;
