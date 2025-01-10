export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html className="scroll-smooth" lang="ko">
      <body>{children}</body>
    </html>
  );
}
