import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Header from '@/app/components/header';

export const metadata: Metadata = {
  title: 'Inside out',
  description: '인간에 지친 당신을 위한 심리 상담 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
