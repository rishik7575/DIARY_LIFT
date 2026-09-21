import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'DairyLift | Farm-to-Table Dairy & Livestock Investment',
    template: '%s | DairyLift',
  },
  description:
    'DairyLift connects urban capital with high-tech Indian dairy farms. Fresh A2 milk delivered in minutes, transparent livestock co-ownership, and full-stack farm operations.',
  keywords: [
    'A2 milk',
    'dairy investment',
    'cattle co-ownership',
    'farm ERP',
    'Gir cow',
    'fresh dairy delivery',
    'agricultural investment India',
  ],
  openGraph: {
    title: 'DairyLift | Farm-to-Table Dairy & Livestock Investment',
    description: 'Fresh dairy. IoT farm telemetry. Transparent livestock co-ownership.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} scroll-smooth`}>
      <body className="font-sans antialiased" style={{ fontFamily: 'var(--font-sans)' }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
