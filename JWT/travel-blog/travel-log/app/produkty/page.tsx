'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { apiFetch } from '@/app/lib/api';

type Produkt = {
  id: number;
  nazwa: string;
  cena: number;
};

export default function ProduktyPage() {
  const { token, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [produkty, setProdukty] = useState<Produkt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    setLoading(true);
    apiFetch('/api/produkty', token)
      .then(async (res) => {
        if (res.status === 401) {
          // Token wygasł albo jest nieprawidłowy — wyloguj i odeślij do logowania
          logout();
          router.push('/logowanie');
          return null;
        }
        if (!res.ok) throw new Error('Nie udało się pobrać produktów');
        return res.json();
      })
      .then((data) => {
        if (data) setProdukty(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isLoggedIn, token, logout, router]);

  if (!isLoggedIn) {
    return (
      <main>
        <h1>Produkty</h1>
        <p>
          Ta lista wymaga zalogowania. <Link href="/logowanie">Zaloguj się</Link>,
          żeby zobaczyć produkty.
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Produkty (dane z Express, endpoint chroniony JWT)</h1>
      {loading && <p>Wczytywanie...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <ul>
        {produkty.map((p) => (
          <li key={p.id}>
            {p.nazwa} — {p.cena} zł
          </li>
        ))}
      </ul>
    </main>
  );
}
