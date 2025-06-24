'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const FormCreatePassword = () => {
	const [password, setPassword] = useState('');

	const handleCopyPassword = () => {
		navigator.clipboard
			.writeText(password)
			.then(() => {
				toast.success('Contraseña copiada al portapapeles');
			})
			.catch(() => toast.error('Error al copiar la contraseña'));
	};

	return (
		<div className="max-w-2xl mx-auto p-6 space-y-6 ">
			<header className="text-center space-y-2">
				<h1 className="text-4xl font-bold text-gray-700">
					Generador de Contraseñas
				</h1>
				<p className="text-gray-600">
					Crea contraseñas seguras y personalizadas
				</p>
			</header>

			<Card className="bg-gradient-to-r from-gray-900 to-gray-800">
				<CardContent className="flex items-center justify-between gap-4">
					<div className="flex-1 min-w-0">
						<p className="text-lg text-slate-400 mb-1">
							Tu contraseña generada:
						</p>
						<div></div>
						<p className="text-xl text-green-400 font-bold break-all leading-relaxed ">
							{password || (
								<span className="text-gray-500">
									Genera una contraseña
								</span>
							)}
						</p>
					</div>
					<Button
						onClick={handleCopyPassword}
						className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer"
						variant="outline"
						disabled={!password}
					>
						<CopyIcon className="text-white" />
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};
