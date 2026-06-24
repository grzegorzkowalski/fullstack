'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DodajDestynacje() {
  const [nazwa, setNazwa] = useState('');
  const [kraj, setKraj] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nazwa || !kraj) return;

    setLoading(true);
    await fetch('/api/destynacje', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nazwa, kraj }),
    });

    setNazwa('');
    setKraj('');
    setLoading(false);
    router.refresh(); // odświeża dane komponentu serwerowego na tej samej stronie
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nazwa miejsca"
        value={nazwa}
        onChange={(e) => setNazwa(e.target.value)}
      />
      <input
        placeholder="Kraj"
        value={kraj}
        onChange={(e) => setKraj(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Dodawanie...' : 'Dodaj'}
      </button>
    </form>
  );
}
