export type Post = {
  id: string;
  title: string;
  category: string;
  content: string;
};

// W realnym projekcie te dane pochodziłyby z bazy danych (np. Prisma + PostgreSQL)
// albo z zewnętrznego API. Tu trzymamy je w pamięci dla uproszczenia warsztatu.
export const posts: Post[] = [
  {
    id: '1',
    title: 'Wyspy Lofoty — pierwsza wyprawa',
    category: 'Europa',
    content:
      'Lofoty to archipelag w północnej Norwegii. Surowy krajobraz, fiordy i rybackie wioski zapadają w pamięć na długo. W tym wpisie opisuję trasę 7-dniowego roadtripu kamperem.',
  },
  {
    id: '2',
    title: 'Tokio w 5 dni',
    category: 'Azja',
    content:
      'Tokio to miasto kontrastów — neony Shibuya, spokój świątyni Senso-ji i jedzenie na każdym rogu. Oto plan na 5 intensywnych dni w japońskiej stolicy.',
  },
  {
    id: '3',
    title: 'Drogą przez Bałkany',
    category: 'Europa',
    content:
      'Chorwacja, Bośnia, Czarnogória i Albania — relacja z dwutygodniowej podróży samochodem przez Bałkany, z noclegami w lokalnych pensjonatach.',
  },
];
