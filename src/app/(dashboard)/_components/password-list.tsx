'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';
import { getPasswordsAction } from '../_actions/get-action';
import PasswordDeleteDialog from './password-delete-password';
import PasswordOptionsTags from './password-options-tags';

const PasswordList = () => {
	const { data, error, isPending, isError } = useQuery({
		queryKey: ['passwords'],
		queryFn: getPasswordsAction,
	});

	const handleCopyPassword = (password: string) => () => {
		navigator.clipboard
			.writeText(password)
			.then(() => {
				toast.success('Contraseña copiada al portapapeles');
			})
			.catch(() => {
				toast.error('Error al copiar la contraseña');
			});
	};

	if (isPending)
		return <p className="text-center text-gray-500">Cargando...</p>;
	if (isError) return <p>Error: ${error.message}.</p>;

	return (
		<div className="max-w-2xl mx-auto p-6 space-y-6">
			<section className="text-center space-y-1">
				<h2 className="text-2xl font-bold text-gray-700">
					Mis contraseñas
				</h2>
				<p className="text-sm text-gray-500">
					Aquí puedes ver y gestionar tus contraseñas guardadas.
				</p>
			</section>

			<section className="space-y-4">
				{/* Aquí puedes mapear tus contraseñas guardadas */}
				{data.map((password) => (
					<Card
						key={password.id}
						className="p-4 shadow-sm hover:shadow-md transition-shadow"
					>
						<CardContent className="p-4 flex justify-between items-center gap-4">
							<section>
								<p className="font-bold text-gray-800">
									Titulo: {password.title}
								</p>
								<p className="text-sm m-2 text-gray-500">
									Longitud de contraseña:{' '}
									<span className="font-bold">
										{password.length}
									</span>
								</p>
								{/* Tags */}
								<PasswordOptionsTags
									passwordConfig={password}
								/>
							</section>
							<section className="flex flex-col space-y-2">
								<Button
									className="cursor-pointer "
									onClick={handleCopyPassword(
										password.decryptedPassword
									)}
								>
									<CopyIcon className="mr-2 h-4 w-4" />
									Copiar contraseña
								</Button>
								<PasswordDeleteDialog id={password.id} />
							</section>
						</CardContent>
					</Card>
				))}
			</section>
		</div>
	);
};

export default PasswordList;
