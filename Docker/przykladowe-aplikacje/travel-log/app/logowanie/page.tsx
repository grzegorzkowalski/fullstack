'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function LogowaniePage() {
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login: doLogin } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await doLogin(login, haslo);
      router.push('/produkty');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Coś poszło nie tak');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Logowanie</h1>
      <p>
        <small>
          Dane testowe z <code>.env</code> aplikacji Express: login{' '}
          <code>admin</code>, hasło <code>tajnehaslo123</code>.
        </small>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={haslo}
          onChange={(e) => setHaslo(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </main>
  );
}
