import Cryptr from 'cryptr';

if (!process.env.ENCRYPTION_KEY) {
	throw new Error('SECRET_KEY environment variable is not set');
}

export const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
