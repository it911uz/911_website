import * as z from "zod";

export const PAYMENT_VALUES = [
    { label: "Отменено", value: "cancelled" },
    { label: "В ожидании", value: "pending" },
    { label: "Успешно", value: "succeeded" },
] as const;

export const PAYMENT_VALUES_TYPE = PAYMENT_VALUES.map(t => t.value) as [
    string,
    ...string[]
];

export const paymentsSchema = z.object({
    amount: z.number()
        .int("Цена должна быть целым числом")
        .gt(0, "Цена должна быть больше 0"),
    status: z.enum(PAYMENT_VALUES_TYPE, {
        message: "Некорректный тип оплаты",
    }).optional()
});

export type PaymentsType = z.infer<typeof paymentsSchema>;