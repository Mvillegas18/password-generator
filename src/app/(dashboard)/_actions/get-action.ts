'use server';

import { cryptr } from '@/lib/crypto';
import prisma from '@/lib/prisma';
import { Password } from '../../../../generated/prisma';

export const getPasswordsAction = async () => {
	const passwords: Password[] = await prisma.password.findMany();
	return passwords.map((password) => ({
		...password,
		decryptedPassword: cryptr.decrypt(password.encryptedPassword), // Assuming you want to return the encrypted password
	}));
};
