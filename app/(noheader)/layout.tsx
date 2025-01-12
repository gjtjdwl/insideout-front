import { AuthProvider } from '../contexts/AuthContext';
import { RouteGuard } from '../components/RouteGuard';

export default function NoHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <RouteGuard>{children}</RouteGuard>
      </AuthProvider>
    </>
  );
}
