import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>TravelLog</h1>
      <p>
        Witaj na blogu podróżniczym! Tu dzielę się relacjami z wyjazdów po
        całym świecie.
      </p>
      <p>
        Zobacz <Link href="/blog">wpisy na blogu</Link> albo{' '}
        <Link href="/destynacje">listę destynacji do odwiedzenia</Link>.
      </p>
    </main>
  );
}
