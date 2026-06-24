'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const links = [
  { href: '/', label: 'Start' },
  { href: '/blog', label: 'Blog' },
  { href: '/destynacje', label: 'Destynacje' },
  { href: '/produkty', label: 'Produkty' },
  { href: '/artykuly-z-api', label: 'Artykuły (Express)' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <nav>
      <ul>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{ fontWeight: isActive ? 'bold' : 'normal' }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Wyloguj</button>
          ) : (
            <Link href="/logowanie">Zaloguj</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
