import DepartmentProvider from '@/app/context/DepartmentContext';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DepartmentProvider>{children}</DepartmentProvider>;
}
