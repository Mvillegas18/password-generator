import { FormCreatePassword } from './_components/form-create-password';
import PasswordList from './_components/password-list';

export default function Dashboard() {
	return (
		<div className="container mx-auto px-4">
			<FormCreatePassword />
			<PasswordList />
		</div>
	);
}
