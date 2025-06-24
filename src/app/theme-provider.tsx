'use client';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="bottom-right" richColors />
			{children}
		</QueryClientProvider>
	);
};

export default ThemeProvider;
