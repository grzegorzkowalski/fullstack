import Link from 'next/link';

export default function AboutPage() {
  return (
    <main>
      <h1>O mnie</h1>
      <p>
        Nazywam się Ania i od 8 lat podróżuję, opisując wyjazdy na tym blogu.
      </p>
      <p>
        Zobacz też moje <Link href="/o-mnie/cv">CV</Link> (przykład trasy
        zagnieżdżonej).
      </p>
    </main>
  );
}
