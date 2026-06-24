import { headers } from 'next/headers';
import DodajDestynacje from '@/app/components/DodajDestynacje';

type Destynacja = {
  id: string;
  nazwa: string;
  kraj: string;
};

async function getDestynacje(): Promise<Destynacja[]> {
  // Komponent serwerowy wywołujący własny Route Handler — potrzebny jest
  // pełny URL, więc budujemy go na podstawie nagłówków żądania.
  const host = (await headers()).get('host');
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';

  const res = await fetch(`${protocol}://${host}/api/destynacje`, {
    cache: 'no-store', // SSR: zawsze świeże dane, lista zmienia się po dodaniu elementu
  });

  return res.json();
}

export default async function DestynacjePage() {
  const destynacje = await getDestynacje();

  return (
    <main>
      <h1>Miejsca do odwiedzenia</h1>
      <ul>
        {destynacje.map((d) => (
          <li key={d.id}>
            {d.nazwa} — {d.kraj}
          </li>
        ))}
      </ul>
      <DodajDestynacje />
    </main>
  );
}
