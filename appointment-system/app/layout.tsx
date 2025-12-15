import './globals.css';
import { ThemeProvider } from '@/lib/ThemeContext';

export const metadata = {
  title: 'Velora | Luxury Salon',
  description: 'Where Style Meets Elegance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}