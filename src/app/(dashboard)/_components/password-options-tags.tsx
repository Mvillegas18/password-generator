'use client';

import { Badge } from '@/components/ui/badge';
import { PasswordConfig } from '@/lib/password';

interface Props {
	passwordConfig: PasswordConfig;
}

const PasswordOptionsTags = ({ passwordConfig }: Props) => {
	return (
		<div className="flex flex-wrap gap-2">
			{[
				{ condition: passwordConfig.hasLowercase, label: 'Minusculas' },
				{ condition: passwordConfig.hasUppercase, label: 'Mayusculas' },
				{ condition: passwordConfig.hasNumbers, label: 'Numeros' },
				{ condition: passwordConfig.hasSymbols, label: 'Simbolos' },
			]
				.filter((item) => item.condition)
				.map((item, key) => (
					<Badge key={key}>{item.label}</Badge>
				))}
		</div>
	);
};

export default PasswordOptionsTags;
