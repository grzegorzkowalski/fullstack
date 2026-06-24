type Artykul = {
  id: number;
  tytul: string;
  tresc: string;
};

async function getArtykuly(): Promise<Artykul[]> {
  const API_URL =
    process.env.API_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:4000';
  const res = await fetch(`${API_URL}/api/artykuly`, { cache: 'no-store' });
  return res.json();
}

export default async function ArtykulyZApiPage() {
  const artykuly = await getArtykuly();

  return (
    <main>
      <h1>Artykuły (dane z Express, endpoint publiczny)</h1>
      <p>
        <small>
          Ta strona jest komponentem serwerowym i nie wymaga logowania — endpoint{' '}
          <code>GET /api/artykuly</code> w Express jest publiczny.
        </small>
      </p>
      <ul>
        {artykuly.map((a) => (
          <li key={a.id}>
            <strong>{a.tytul}</strong>
            <p>{a.tresc}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
