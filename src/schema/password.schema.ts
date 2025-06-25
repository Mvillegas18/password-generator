import { z } from 'zod';

export const passwordSchema = z.object({
	title: z.string().trim().min(1, 'El título es obligatorio'),
	password: z.string().trim().min(4, 'La contraseña es obligatoria'),
	length: z.coerce.number().min(4).max(64),
	hasUppercase: z.boolean().optional(),
	hasLowercase: z.boolean().optional(),
	hasNumbers: z.boolean().optional(),
	hasSymbols: z.boolean().optional(),
});

export type PasswordSchema = z.infer<typeof passwordSchema>;
