import Link from 'next/link';
import { posts } from './data';

// Komponent serwerowy: dane są dostępne lokalnie (tablica), ale w realnym
// projekcie tutaj pojawiłby się np. `await fetch(...)` albo zapytanie do bazy.
//
// Tryby renderowania (do przetestowania, gdy dane pochodzą z fetch()):
// - SSG: domyślne zachowanie fetch -> cache: 'force-cache'
// - SSR: fetch(url, { cache: 'no-store' })  albo  export const dynamic = 'force-dynamic';
// - ISR: fetch(url, { next: { revalidate: 60 } })

export default function BlogPage() {
  return (
    <>
      <h1>Wpisy na blogu</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>{' '}
            <small>({post.category})</small>
          </li>
        ))}
      </ul>
    </>
  );
}
