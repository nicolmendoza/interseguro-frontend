import type { Metadata } from 'next';
import { Sofia_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const sofiaSans = Sofia_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sofia-sans',
});

export const metadata: Metadata = {
  title: 'Interseguro Challenge',
  description: 'Proyecto de reto tecnico que factoriza matrices',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${sofiaSans.variable} ${sofiaSans.className}`}>
        <Script src="/config.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
