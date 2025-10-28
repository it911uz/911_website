import * as z from "zod";

export const callBackSchema = z.object({
	fullName: z
		.string()
		.nonempty("Обязательное поле")
		.min(3, "Минимум 3 символа")
		.max(50, "Максимум 50 символов"),

	email: z
		.string()
		.nonempty("Обязательное поле")
		.regex(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Введите корректную почту"
		),

	phone: z
		.string()
		.nonempty("Обязательное поле")
		.regex(
			/^\+998(33|77|88|90|91|93|94|95|97|98|99)\d{7}$/,
			"Введите корректный номер телефона (пример: +998901234567)"
		),

	companyName: z
		.string()
		.nonempty("Обязательное поле")
		.min(3, "Минимум 3 символа")
		.max(50, "Максимум 50 символов"),

	companyInfo: z
		.string()
		.max(1000, "Максимум 1000 символов")
		.optional(),
});

export type CallBackSchemaType = z.infer<typeof callBackSchema>;
