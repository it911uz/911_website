import * as z from "zod";

export const profileSchema = z.object({
    full_name: z.string().min(2),
    username: z.string().min(3),
    email: z.string().email(),
    phone_number: z.string().nullable().optional(),
    role: z.any(),
    is_superuser: z.boolean(),
});