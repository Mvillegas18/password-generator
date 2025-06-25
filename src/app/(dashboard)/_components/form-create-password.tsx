'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { generatePassword, PasswordConfig } from '@/lib/password';
import {
	ArrowUp01,
	CaseLower,
	CaseUpper,
	CopyIcon,
	Hash,
	ShieldCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import FormSavePassword from './form-save-password';

const options = [
	{
		label: 'Mayúsculas (A-Z)',
		key: 'hasUppercase',
		icon: <CaseUpper className="inline-block w-4 h-4" />,
	},
	{
		label: 'Minúsculas (a-z)',
		key: 'hasLowercase',
		icon: <CaseLower className="inline-block w-4 h-4" />,
	},
	{
		label: 'Números (0-9)',
		key: 'hasNumbers',
		icon: <ArrowUp01 className="inline-block w-4 h-4" />,
	},
	{
		label: 'Símbolos (!@#$%^&*)',
		key: 'hasSymbols',
		icon: <Hash className="inline-block w-4 h-4" />,
	},
] as const;

export const FormCreatePassword = () => {
	const [password, setPassword] = useState('');
	const form = useForm<PasswordConfig>({
		defaultValues: {
			length: 16,
			hasLowercase: true,
			hasUppercase: true,
			hasNumbers: true,
			hasSymbols: true,
		},
	});

	useEffect(() => {
		const newPassword = generatePassword(form.getValues());
		setPassword(newPassword);
	}, [form.getValues, form]);

	const handleCopyPassword = () => {
		navigator.clipboard
			.writeText(password)
			.then(() => {
				toast.success('Contraseña copiada al portapapeles');
			})
			.catch(() => toast.error('Error al copiar la contraseña'));
	};

	const handleGeneratePassword = () => {
		const values = form.getValues();
		const newPassword = generatePassword(values);
		setPassword(newPassword);
		toast.success('Contraseña generada con éxito');
		form.reset(values);
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

			<Card>
				<CardContent>
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Personaliza tu contraseña
					</h2>

					<Form {...form}>
						<form
							className="space-y-6"
							onSubmit={form.handleSubmit(handleGeneratePassword)}
						>
							<FormField
								control={form.control}
								name={'length'}
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel
												className="text-sm font-medium text-gray-700"
												htmlFor="length"
											>
												Longitud
											</FormLabel>
											<FormControl>
												<Input
													className="text-center text-lg font-semibold h-12"
													type="number"
													id="length"
													{...field}
													min={4}
													max={64}
												/>
											</FormControl>
										</FormItem>
									);
								}}
							/>
							<div className="space-y-3">
								<h3 className="text-sm font-medium">
									Incluir caracteres
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{options.map((options) => (
										<FormField
											key={options.key}
											control={form.control}
											name={options.key}
											render={({ field }) => {
												return (
													<FormItem>
														<FormLabel>
															<FormControl>
																<Checkbox
																	checked={
																		field.value
																	}
																	onCheckedChange={
																		field.onChange
																	}
																/>
															</FormControl>
															<span className="text-sm">
																{options.label}{' '}
																({options.icon})
															</span>
															<div>
																<p></p>
															</div>
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
								<Button type="submit">
									<ShieldCheck className="inline-block w-4 h-4 mr-2" />
									Generar nueva Contraseña
								</Button>
								<FormSavePassword
									password={password}
									passwordConfig={form.getValues()}
								/>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
