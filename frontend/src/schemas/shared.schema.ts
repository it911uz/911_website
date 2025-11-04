import * as z from "zod";

export const pageValidation = z.pipe(z.string().transform(Number), z.number().min(1));