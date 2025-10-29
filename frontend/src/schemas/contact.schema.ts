import * as z from "zod";

export const contactSchema = z.object({
	full_name: z
		.string()
		.trim()
		.nonempty("Обязательное поле")
		.min(3, "Минимум 3 символа")
		.max(50, "Максимум 50 символов"),

	email: z
		.string()
		.trim()
		.nonempty("Обязательное поле")
		.regex(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Введите корректную почту",
		),

	phone: z
		.string()
		.trim()
		.nonempty("Обязательное поле")
		.regex(
			/^\+998(20|33|50|77|78|88|90|91|93|94|95|97|98|99)\d{7}$/,
			"Введите корректный номер телефона (пример: +998901234567)",
		),

	company_name: z
		.string()
		.trim()
		.nonempty("Обязательное поле")
		.min(3, "Минимум 3 символа")
		.max(50, "Максимум 50 символов"),

	company_info: z.string().trim().nonempty("Обязательное поле").max(1000, "Максимум 1000 символов"),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
