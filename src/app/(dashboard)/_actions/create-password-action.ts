'use server';

import { cryptr } from '@/lib/crypto';
import prisma from '@/lib/prisma';
import { passwordSchema, type PasswordSchema } from '@/schema/password.schema';

export const CreatePasswordAction = async (newPassword: PasswordSchema) => {
	const parseBody = passwordSchema.safeParse(newPassword);

	if (!parseBody.success) {
		throw new Error(
			`Invalid password: ${parseBody.error.errors
				.map((e) => e.message)
				.join(', ')}`
		);
	}

	const { password, ...rest } = parseBody.data;

	const encryptedPassword = cryptr.encrypt(password);

	return await prisma.password.create({
		data: {
			encryptedPassword,
			...rest,
		},
	});
};
