import type { Metadata } from 'next';
import Nav from './components/Nav';
import { AuthProvider } from './context/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'TravelLog',
  description: 'Blog podróżniczy — przykładowa aplikacja Next.js (App Router)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          <header>
            <Nav />
          </header>
          {children}
          <footer>
            <p>© TravelLog 2026 — projekt warsztatowy Next.js + Express</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

