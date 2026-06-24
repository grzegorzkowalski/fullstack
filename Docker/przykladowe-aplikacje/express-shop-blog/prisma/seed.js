import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const liczbaProduktow = await prisma.produkt.count();
  if (liczbaProduktow === 0) {
    await prisma.produkt.createMany({
      data: [
        { nazwa: 'Kubek termiczny', cena: 49.99 },
        { nazwa: 'Plecak trekkingowy', cena: 249.0 },
        { nazwa: 'Latarka czołowa', cena: 79.5 },
      ],
    });
    console.log('Zasiano przykładowe produkty.');
  }

  const liczbaArtykulow = await prisma.artykul.count();
  if (liczbaArtykulow === 0) {
    await prisma.artykul.createMany({
      data: [
        {
          tytul: 'Jak pakować plecak na wyjazd',
          tresc:
            'Kilka zasad pakowania, dzięki którym zmieścisz więcej i będziesz nosić mniej.',
        },
        {
          tytul: 'Najlepszy sprzęt na zimę',
          tresc: 'Przegląd kurtek, butów i akcesoriów na mroźne wyprawy.',
        },
      ],
    });
    console.log('Zasiano przykładowe artykuły.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
