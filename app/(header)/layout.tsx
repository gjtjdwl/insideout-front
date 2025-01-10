import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="scroll-smooth" lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
