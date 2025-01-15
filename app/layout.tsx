import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inside out',
  description: '인간에 지친 당신을 위한 심리 상담 플랫폼',
  icons: {
		icon: "/hq_logo.svg",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="ko">
      <body>{children}</body>
    </html>
  );
}
