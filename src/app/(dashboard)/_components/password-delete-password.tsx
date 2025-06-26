import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { deletePasswordAction } from '../_actions/delete-password';

interface Props {
	id: string;
}

export default function PasswordDeleteDialog({ id }: Props) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (id: string) => deletePasswordAction(id),
		async onSuccess(data) {
			toast.success(`Contraseña ${data.title} eliminada correctamente`);
			queryClient.invalidateQueries({
				queryKey: ['passwords'],
			});
		},
		onError() {
			toast.error(`Error al eliminar la contraseña`);
		},
	});
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">
					<Trash2Icon /> Eliminar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Seguro que quieres eliminar esta contraseña?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se puede deshacer. Esto eliminará
						permanentemente tu contraseña y eliminará tus datos de
						nuestros servidores.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							mutate(id);
						}}
						disabled={isPending}
					>
						Continuar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
