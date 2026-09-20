import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Dairy-Lift | Institutional Dairy Investment & ERP Platform',
    template: '%s | Dairy-Lift',
  },
  description:
    'Dairy-Lift bridges urban capital with rural livestock farming. Sustainable 1.5% fixed monthly base yield with dynamic performance bonuses, IoT telemetry, and farm quick commerce.',
  keywords: [
    'dairy investment',
    'A2 milk',
    'cattle asset',
    'farm ERP',
    'Gir cow',
    'yield reserve',
    'institutional wealth',
  ],
  openGraph: {
    title: 'Dairy-Lift | Institutional Dairy Investment & ERP Platform',
    description: 'Fresh dairy. Verifiable IoT telemetry. Sustainable institutional yields.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#FAFAFA] text-slate-900 min-h-screen selection:bg-amber-100 selection:text-amber-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
