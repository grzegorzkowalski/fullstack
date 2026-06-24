import { notFound } from 'next/navigation';
import LikeButton from '@/app/components/LikeButton';
import { posts } from '../data';

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // w Next.js 15+ params jest Promisem

  // Symulowane opóźnienie, żeby zobaczyć działanie loading.tsx
  // (w realnym projekcie to byłby czas odpowiedzi bazy danych / API)
  await new Promise((resolve) => setTimeout(resolve, 600));

  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>
        <small>Kategoria: {post.category}</small>
      </p>
      <p>{post.content}</p>
      <LikeButton />
    </article>
  );
}
