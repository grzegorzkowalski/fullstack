export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
        <aside style={{ minWidth: '140px' }}>
          <h3>Kategorie</h3>
          <ul>
            <li>Europa</li>
            <li>Azja</li>
            <li>Ameryka Południowa</li>
          </ul>
        </aside>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </main>
  );
}
