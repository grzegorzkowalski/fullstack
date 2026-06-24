import { NextResponse } from 'next/server';

type Destynacja = {
  id: string;
  nazwa: string;
  kraj: string;
};

// Uwaga: tablica w pamięci resetuje się po restarcie serwera deweloperskiego —
// to wystarcza na potrzeby warsztatu. W realnym projekcie użylibyśmy bazy danych
// (np. Prisma + PostgreSQL), tak jak w module DevTrack.
let destynacje: Destynacja[] = [
  { id: '1', nazwa: 'Lofoty', kraj: 'Norwegia' },
  { id: '2', nazwa: 'Kioto', kraj: 'Japonia' },
  { id: '3', nazwa: 'Patagonia', kraj: 'Argentyna / Chile' },
];

export async function GET() {
  return NextResponse.json(destynacje);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.nazwa || !body.kraj) {
    return NextResponse.json(
      { error: 'Wymagane pola: nazwa, kraj' },
      { status: 400 }
    );
  }

  const nowaDestynacja: Destynacja = {
    id: String(destynacje.length + 1),
    nazwa: body.nazwa,
    kraj: body.kraj,
  };

  destynacje.push(nowaDestynacja);

  return NextResponse.json(nowaDestynacja, { status: 201 });
}
