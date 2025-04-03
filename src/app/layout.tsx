// src/app/layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Provider } from 'react-redux';
import StoreProvider from './StoreProvider';

// Fontes locais
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// Exportação de metadata (lado do servidor)
export const metadata: Metadata = {
  title: 'Lista de Compras',
  description: 'Monte sua lista rápida e fácil',
  authors: {
    name: 'Leonardo Hernandes',
    url: 'https://www.linkedin.com/in/leonardo-hernandes/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <StoreProvider >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900`}
        >
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
