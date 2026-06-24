'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Start' },
  { href: '/blog', label: 'Blog' },
  { href: '/destynacje', label: 'Destynacje' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Nav() {
  const pathname = usePathname();

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
      </ul>
    </nav>
  );
}
