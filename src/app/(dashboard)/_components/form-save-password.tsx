'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordConfig } from '@/lib/password';
import { passwordSchema, type PasswordSchema } from '@/schema/password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SaveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CreatePasswordAction } from '../_actions/create-password-action';
import PasswordOptionsTags from './password-options-tags';

interface Props {
	password: string;
	passwordConfig: PasswordConfig;
}

export function FormSavePassword({ password, passwordConfig }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<PasswordSchema>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			title: '',
			password: '',
		},
	});

	useEffect(() => {
		if (isOpen) {
			form.setValue('password', password);
			form.setValue('length', passwordConfig.length || 12);
			form.setValue('hasLowercase', passwordConfig.hasLowercase);
			form.setValue('hasUppercase', passwordConfig.hasUppercase);
			form.setValue('hasNumbers', passwordConfig.hasNumbers);
			form.setValue('hasSymbols', passwordConfig.hasSymbols);
		}
	}, [isOpen, password, form, passwordConfig]);

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: CreatePasswordAction,
		async onSuccess(data) {
			form.reset();
			toast.success(`Password: ${data.title} saved successfully! 🎉`);
			setIsOpen(false);
			queryClient.invalidateQueries({
				queryKey: ['passwords'],
			});
		},
		onError(error) {
			toast.error(`Error saving password: ${error.message}`);
		},
	});

	function onSubmit(values: PasswordSchema) {
		mutate(values);
	}
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full ">
					<SaveIcon />
					Guardar contraseña
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold flex items-center gap-2">
						<SaveIcon /> Guardar Contraseña
					</DialogTitle>
					<DialogDescription>
						Guarda la contraseña actual en tu gestor de contraseñas
						preferido.
					</DialogDescription>
				</DialogHeader>
				<section className="space-y-6">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Titulo de la contraseña
										</FormLabel>
										<FormControl>
											<Input
												className="h-12"
												placeholder="Ej: Google, Gmail, etc."
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Titulo de la contraseña
										</FormLabel>
										<FormControl>
											<Input
												disabled
												className="h-12 bg-gray-100 font-mono text-gray-800"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 rounded-xl p-4">
								<h3 className="text-sm font-semibold text-blue-800 mb-3">
									Configuracion aplicada
								</h3>
								<div className="space-y-4 text-sm">
									<p>
										<span className="font-bold">
											Longitud:{' '}
											{passwordConfig.length || 12}{' '}
											caracteres
										</span>
									</p>
									<PasswordOptionsTags
										passwordConfig={passwordConfig}
									/>
								</div>
							</div>
						</form>
					</Form>
				</section>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						disabled={isPending}
						type="submit"
						onClick={form.handleSubmit(onSubmit)}
						className="bg-blue-600 hover:bg-blue-700 text-white"
					>
						Guardar contraseña
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default FormSavePassword;
